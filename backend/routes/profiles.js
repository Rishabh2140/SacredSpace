const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Rating = require("../models/Rating")
const auth = require("../middleware/auth")

// Get all profiles with filtering
router.get("/", async (req, res) => {
  try {
    const { category, search, location } = req.query
    const query = { role: { $in: ["samiti", "murtikar", "pujari", "kathavachak"] } }

    if (category && category !== "all") {
      query.role = category
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { "profile.specialization": { $regex: search, $options: "i" } },
        { "profile.expertise": { $regex: search, $options: "i" } },
        { "profile.location": { $regex: search, $options: "i" } },
      ]
    }

    if (location) {
      query["profile.location"] = { $regex: location, $options: "i" }
    }

    const profiles = await User.find(query).select("-password -otp").populate("ratings").lean()

    // Calculate average ratings
    const profilesWithRatings = await Promise.all(
      profiles.map(async (profile) => {
        const ratings = await Rating.find({ target: profile._id, targetType: "User" })
        const averageRating =
          ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length : 0

        return {
          ...profile,
          averageRating,
          totalRatings: ratings.length,
          type: profile.role,
        }
      }),
    )

    res.json(profilesWithRatings)
  } catch (error) {
    console.error("Error fetching profiles:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get single profile
router.get("/:id", async (req, res) => {
  try {
    const profile = await User.findById(req.params.id).select("-password -otp").populate("ratings").lean()

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" })
    }

    const ratings = await Rating.find({ target: profile._id, targetType: "User" }).populate("user", "name")
    const averageRating =
      ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length : 0

    res.json({
      ...profile,
      averageRating,
      totalRatings: ratings.length,
      ratings: ratings,
    })
  } catch (error) {
    console.error("Error fetching profile:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Rate a profile
router.post("/:id/rate", auth, async (req, res) => {
  try {
    const { rating, comment } = req.body
    const targetUserId = req.params.id
    const userId = req.user.userId

    // Check if user already rated this profile
    const existingRating = await Rating.findOne({
      user: userId,
      target: targetUserId,
      targetType: "User",
    })

    if (existingRating) {
      existingRating.rating = rating
      existingRating.review = comment
      await existingRating.save()
    } else {
      const newRating = new Rating({
        user: userId,
        target: targetUserId,
        targetType: "User",
        rating,
        review: comment,
      })
      await newRating.save()
    }

    res.json({ message: "Rating submitted successfully" })
  } catch (error) {
    console.error("Error rating profile:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Follow a profile
router.post("/:id/follow", auth, async (req, res) => {
  try {
    const targetUserId = req.params.id
    const userId = req.user.userId

    const user = await User.findById(userId)
    const targetUser = await User.findById(targetUserId)

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" })
    }

    const isFollowing = user.following.includes(targetUserId)

    if (isFollowing) {
      user.following = user.following.filter((id) => id.toString() !== targetUserId)
      targetUser.followers = targetUser.followers.filter((id) => id.toString() !== userId)
    } else {
      user.following.push(targetUserId)
      targetUser.followers.push(userId)
    }

    await user.save()
    await targetUser.save()

    res.json({
      message: isFollowing ? "Unfollowed successfully" : "Followed successfully",
      isFollowing: !isFollowing,
    })
  } catch (error) {
    console.error("Error following profile:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update profile
router.put("/me", auth, async (req, res) => {
  try {
    const userId = req.user.userId
    const updates = req.body

    const user = await User.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true }).select(
      "-password -otp",
    )

    res.json(user)
  } catch (error) {
    console.error("Error updating profile:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
