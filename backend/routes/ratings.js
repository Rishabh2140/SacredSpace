const express = require("express")
const Rating = require("../models/Rating")
const Pandal = require("../models/Pandal")
const auth = require("../middleware/auth")
const mongoose = require("mongoose") // Import mongoose

const router = express.Router()

// Create a rating
router.post("/", auth, async (req, res) => {
  try {
    const { pandalId, rating, comment, category } = req.body

    if (!pandalId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Pandal ID and rating are required",
      })
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      })
    }

    // Check if pandal exists
    const pandal = await Pandal.findById(pandalId)
    if (!pandal) {
      return res.status(404).json({
        success: false,
        message: "Pandal not found",
      })
    }

    // Check if user already rated this pandal
    const existingRating = await Rating.findOne({
      user: req.user.userId,
      target: pandalId,
      targetType: "Pandal",
    })

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating
      existingRating.comment = comment || existingRating.comment
      existingRating.category = category || existingRating.category
      existingRating.updatedAt = Date.now()

      await existingRating.save()

      // Recalculate pandal average rating
      await updatePandalRating(pandalId)

      res.json({
        success: true,
        data: existingRating,
        message: "Rating updated successfully",
      })
    } else {
      // Create new rating
      const newRating = new Rating({
        user: req.user.userId,
        target: pandalId,
        targetType: "Pandal",
        rating,
        review: comment,
      })

      await newRating.save()

      // Update pandal average rating
      await updatePandalRating(pandalId)

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
      .limit(limit * 1)
      .skip((page - 1) * limit)

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
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
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

// Get user's ratings
router.get("/user", auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query

    const ratings = await Rating.find({ user: req.user.userId })
      .populate("target", "name location.city type")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Rating.countDocuments({ user: req.user.userId })

    res.json({
      success: true,
      data: {
        ratings,
        pagination: {
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error("Get user ratings error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
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

    const pandalId = rating.target
    await Rating.findByIdAndDelete(ratingId)

    // Update pandal average rating
    await updatePandalRating(pandalId)

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
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalRatings: { $sum: 1 },
        },
      },
    ])

    const pandal = await Pandal.findById(pandalId)
    if (pandal) {
      if (stats.length > 0) {
        pandal.ratings.average = Math.round(stats[0].averageRating * 10) / 10
        pandal.ratings.count = stats[0].totalRatings
      } else {
        pandal.ratings.average = 0
        pandal.ratings.count = 0
      }
      await pandal.save()
    }
  } catch (error) {
    console.error("Update pandal rating error:", error)
  }
}

module.exports = router
