const express = require("express")
const Pandal = require("../models/Pandal")
const auth = require("../middleware/auth")

const router = express.Router()

// Get all pandals with optional filters
router.get("/", async (req, res) => {
  try {
    const {
      type,
      city,
      category,
      isLive,
      lat,
      lng,
      radius = 10, // km
      limit = 50,
      page = 1,
    } = req.query

    const query = { isActive: true }

    // Apply filters
    if (type && type !== "all") query.type = type
    if (city && city !== "all") query["location.city"] = city
    if (category) query.category = category
    if (isLive === "true") query["liveStream.isLive"] = true

    // Geospatial query for nearby pandals
    if (lat && lng) {
      query["location.coordinates"] = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number.parseFloat(lng), Number.parseFloat(lat)],
          },
          $maxDistance: radius * 1000, // Convert km to meters
        },
      }
    }

    const skip = (page - 1) * limit

    const pandals = await Pandal.find(query)
      .populate("samiti", "name profile.avatar")
      .populate("murtikar", "name profile.avatar")
      .populate("pujari", "name profile.avatar")
      .limit(Number.parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 })

    const total = await Pandal.countDocuments(query)

    res.json({
      success: true,
      data: pandals,
      pagination: {
        current: Number.parseInt(page),
        total: Math.ceil(total / limit),
        count: pandals.length,
        totalRecords: total,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching pandals",
      error: error.message,
    })
  }
})

// Get pandal by ID
router.get("/:id", async (req, res) => {
  try {
    const pandal = await Pandal.findById(req.params.id)
      .populate("samiti", "name email phone profile ratings")
      .populate("murtikar", "name email phone profile ratings")
      .populate("pujari", "name email phone profile ratings")

    if (!pandal) {
      return res.status(404).json({
        success: false,
        message: "Pandal not found",
      })
    }

    // Increment visitor count
    await Pandal.findByIdAndUpdate(req.params.id, {
      $inc: { "visitors.total": 1, "visitors.today": 1 },
    })

    res.json({
      success: true,
      data: pandal,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching pandal",
      error: error.message,
    })
  }
})

// Create new pandal (requires auth)
router.post("/", auth, async (req, res) => {
  try {
    const pandalData = {
      ...req.body,
      samiti: req.user.role === "samiti" ? req.user.userId : req.body.samiti,
    }

    const pandal = new Pandal(pandalData)
    await pandal.save()

    res.status(201).json({
      success: true,
      message: "Pandal created successfully",
      data: pandal,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating pandal",
      error: error.message,
    })
  }
})

// Update pandal (requires auth and ownership)
router.put("/:id", auth, async (req, res) => {
  try {
    const pandal = await Pandal.findById(req.params.id)

    if (!pandal) {
      return res.status(404).json({
        success: false,
        message: "Pandal not found",
      })
    }

    // Check if user has permission to update
    if (req.user.role !== "admin" && pandal.samiti.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this pandal",
      })
    }

    const updatedPandal = await Pandal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    res.json({
      success: true,
      message: "Pandal updated successfully",
      data: updatedPandal,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating pandal",
      error: error.message,
    })
  }
})

// Get nearby pandals
router.get("/nearby/:lat/:lng", async (req, res) => {
  try {
    const { lat, lng } = req.params
    const { radius = 10, limit = 20 } = req.query

    const pandals = await Pandal.find({
      isActive: true,
      "location.coordinates": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number.parseFloat(lng), Number.parseFloat(lat)],
          },
          $maxDistance: radius * 1000,
        },
      },
    })
      .populate("samiti", "name profile.avatar")
      .limit(Number.parseInt(limit))

    res.json({
      success: true,
      data: pandals,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching nearby pandals",
      error: error.message,
    })
  }
})

module.exports = router
