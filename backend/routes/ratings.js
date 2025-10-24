const express = require("express")
const Rating = require("../models/Rating")
const Pandal = require("../models/Pandal")
const SacredSpace = require("../models/SacredSpace")
const auth = require("../middleware/auth")
const mongoose = require("mongoose") // Import mongoose

const router = express.Router()

// Create a rating
router.post("/", auth, async (req, res) => {
  try {
    const { pandalId, spaceId, rating, comment, category } = req.body
    const target = pandalId || spaceId
    const targetType = pandalId ? "Pandal" : "Space"

    if (!target || !rating) {
      return res.status(400).json({
        success: false,
        message: "Target ID and rating are required",
      })
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      })
    }

    // Check if target exists
    const entity = targetType === "Pandal" ? await Pandal.findById(target) : await SacredSpace.findById(target)
    if (!entity) {
      return res.status(404).json({
        success: false,
        message: `${targetType} not found`,
      })
    }

    // Check if user already rated this target
    const existingRating = await Rating.findOne({
      user: req.user.userId,
      target,
      targetType,
    })

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating
      existingRating.comment = comment || existingRating.comment
      existingRating.category = category || existingRating.category
      existingRating.updatedAt = Date.now()

      await existingRating.save()

      // Recalculate target average rating
      if (targetType === "Pandal") {
        await updatePandalRating(target)
      } else {
        await updateSpaceRating(target)
      }

      res.json({
        success: true,
        data: existingRating,
        message: "Rating updated successfully",
      })
    } else {
      // Create new rating
      const newRating = new Rating({
        user: req.user.userId,
        target,
        targetType,
        rating,
        review: comment,
      })

      await newRating.save()

      // Update target average rating
      if (targetType === "Pandal") {
        await updatePandalRating(target)
      } else {
        await updateSpaceRating(target)
      }

      res.status(201).json({
        success: true,
        data: newRating,
        message: "Rating created successfully",
      })
    }
  } catch (error) {
    console.error("Create rating error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// Get ratings for a pandal
router.get("/pandal/:pandalId", async (req, res) => {
  try {
    const { pandalId } = req.params
    const { page = 1, limit = 10, category } = req.query

    const query = { target: pandalId, targetType: "Pandal" }
    if (category && category !== "all") {
      query.category = category
    }

    const ratings = await Rating.find(query)
      .populate("user", "name avatar")
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))

    const total = await Rating.countDocuments(query)

    // Calculate rating statistics
    const stats = await Rating.aggregate([
      { $match: { target: new mongoose.Types.ObjectId(pandalId), targetType: "Pandal" } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalRatings: { $sum: 1 },
          ratingDistribution: {
            $push: "$rating",
          },
        },
      },
    ])

    const ratingStats = stats[0] || {
      averageRating: 0,
      totalRatings: 0,
      ratingDistribution: [],
    }

    // Calculate distribution
    const distribution = [1, 2, 3, 4, 5].map((star) => ({
      star,
      count: ratingStats.ratingDistribution.filter((r) => r === star).length,
    }))

    res.json({
      success: true,
      data: {
        ratings,
        stats: {
          average: ratingStats.averageRating,
          total: ratingStats.totalRatings,
          distribution,
        },
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    })
  } catch (error) {
    console.error("Get ratings error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// Get ratings for a space
router.get("/space/:spaceId", async (req, res) => {
  try {
    const { spaceId } = req.params
    const { page = 1, limit = 10, category } = req.query

    const query = { target: spaceId, targetType: "Space" }
    if (category && category !== "all") {
      query.category = category
    }

    const ratings = await Rating.find(query)
      .populate("user", "name avatar")
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))

    const total = await Rating.countDocuments(query)

    const stats = await Rating.aggregate([
      { $match: { target: new mongoose.Types.ObjectId(spaceId), targetType: "Space" } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalRatings: { $sum: 1 },
          ratingDistribution: { $push: "$rating" },
        },
      },
    ])

    const ratingStats = stats[0] || { averageRating: 0, totalRatings: 0, ratingDistribution: [] }

    const distribution = [1, 2, 3, 4, 5].map((star) => ({
      star,
      count: ratingStats.ratingDistribution.filter((r) => r === star).length,
    }))

    res.json({
      success: true,
      data: {
        ratings,
        stats: {
          average: ratingStats.averageRating,
          total: ratingStats.totalRatings,
          distribution,
        },
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    })
  } catch (error) {
    console.error("Get ratings error:", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

// Get user's ratings (no populate due to polymorphic target)
router.get("/user", auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query

    const ratings = await Rating.find({ user: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))

    const total = await Rating.countDocuments({ user: req.user.userId })

    res.json({
      success: true,
      data: {
        ratings,
        pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) },
      },
    })
  } catch (error) {
    console.error("Get user ratings error:", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

// Delete a rating
router.delete("/:ratingId", auth, async (req, res) => {
  try {
    const { ratingId } = req.params

    const rating = await Rating.findById(ratingId)
    if (!rating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      })
    }

    // Check if user owns this rating
    if (rating.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this rating",
      })
    }

    const targetId = rating.target
    await Rating.findByIdAndDelete(ratingId)

    // Update target average rating
    if (rating.targetType === "Pandal") {
      await updatePandalRating(targetId)
    } else {
      await updateSpaceRating(targetId)
    }

    res.json({
      success: true,
      message: "Rating deleted successfully",
    })
  } catch (error) {
    console.error("Delete rating error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// Helper function to update pandal rating
async function updatePandalRating(pandalId) {
  try {
    const stats = await Rating.aggregate([
      { $match: { target: new mongoose.Types.ObjectId(pandalId), targetType: "Pandal" } },
      { $group: { _id: null, averageRating: { $avg: "$rating" }, totalRatings: { $sum: 1 } } },
    ])

    const pandal = await Pandal.findById(pandalId)
    if (pandal) {
      if (stats.length > 0) {
        pandal.ratingAvg = Math.round(stats[0].averageRating * 10) / 10
      } else {
        pandal.ratingAvg = 0
      }
      await pandal.save()
    }
  } catch (error) {
    console.error("Update pandal rating error:", error)
  }
}

// Helper function to update space rating
async function updateSpaceRating(spaceId) {
  try {
    const stats = await Rating.aggregate([
      { $match: { target: new mongoose.Types.ObjectId(spaceId), targetType: "Space" } },
      { $group: { _id: null, averageRating: { $avg: "$rating" }, totalRatings: { $sum: 1 } } },
    ])

    const space = await SacredSpace.findById(spaceId)
    if (space) {
      if (stats.length > 0) {
        space.ratingAvg = Math.round(stats[0].averageRating * 10) / 10
      } else {
        space.ratingAvg = 0
      }
      await space.save()
    }
  } catch (error) {
    console.error("Update space rating error:", error)
  }
}

module.exports = router
