const express = require("express")
const Booking = require("../models/Booking")
const Pandal = require("../models/Pandal")
const mongoose = require("mongoose") // Import mongoose
const auth = require("../middleware/auth")

const router = express.Router()

// Create a booking
router.post("/", auth, async (req, res) => {
  try {
    const { pandalId, eventId, bookingDate, numberOfPeople, specialRequests } = req.body

    if (!pandalId || !bookingDate) {
      return res.status(400).json({
        success: false,
        message: "Pandal ID and booking date are required",
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

    // Check if booking date is in the future
    const bookingDateTime = new Date(bookingDate)
    if (bookingDateTime <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Booking date must be in the future",
      })
    }

    const booking = new Booking({
      client: req.user.userId,
      serviceProvider: pandal.samiti, // Assuming samiti is the service provider
      serviceType: "pandal",
      details: {
        title: `Visit to ${pandal.name}`,
        description: specialRequests || "General visit",
        eventDate: bookingDateTime,
        duration: 2, // Default 2 hours
        location: pandal.location,
      },
      pricing: {
        amount: 0, // Free visit, can be updated later
        currency: "INR",
      },
      status: "pending",
    })

    await booking.save()

    // Populate the booking with service provider and client details
    const populatedBooking = await Booking.findById(booking._id)
      .populate("serviceProvider", "name email")
      .populate("client", "name email")

    res.status(201).json({
      success: true,
      data: populatedBooking,
      message: "Booking created successfully",
    })
  } catch (error) {
    console.error("Create booking error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// Get user's bookings
router.get("/user", auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query

    const query = { client: req.user.userId }
    if (status && status !== "all") {
      query.status = status
    }

    const bookings = await Booking.find(query)
      .populate("serviceProvider", "name email")
      .populate("client", "name email")
      .sort({ "details.eventDate": -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Booking.countDocuments(query)

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error("Get user bookings error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// Get bookings for a pandal (for pandal owners/admins)
router.get("/pandal/:pandalId", auth, async (req, res) => {
  try {
    const { pandalId } = req.params
    const { page = 1, limit = 10, status, date } = req.query

    // Check if user has permission to view pandal bookings
    const pandal = await Pandal.findById(pandalId)
    if (!pandal) {
      return res.status(404).json({
        success: false,
        message: "Pandal not found",
      })
    }

    // For now, allow any authenticated user to view bookings
    // In production, you'd check if user is the pandal owner or admin

    const query = { serviceProvider: pandalId }
    if (status && status !== "all") {
      query.status = status
    }
    if (date) {
      const startDate = new Date(date)
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 1)
      query["details.eventDate"] = { $gte: startDate, $lt: endDate }
    }

    const bookings = await Booking.find(query)
      .populate("client", "name email")
      .sort({ "details.eventDate": -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Booking.countDocuments(query)

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error("Get pandal bookings error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// Update booking status
router.put("/:bookingId/status", auth, async (req, res) => {
  try {
    const { bookingId } = req.params
    const { status } = req.body

    if (!["confirmed", "cancelled", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be confirmed, cancelled, or completed",
      })
    }

    const booking = await Booking.findById(bookingId)
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })
    }

    // Check if user owns this booking or is service provider
    if (booking.client.toString() !== req.user.userId && booking.serviceProvider.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this booking",
      })
    }

    booking.status = status
    booking.updatedAt = Date.now()
    await booking.save()

    const updatedBooking = await Booking.findById(bookingId)
      .populate("serviceProvider", "name email")
      .populate("client", "name email")

    res.json({
      success: true,
      data: updatedBooking,
      message: "Booking status updated successfully",
    })
  } catch (error) {
    console.error("Update booking status error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// Cancel a booking
router.delete("/:bookingId", auth, async (req, res) => {
  try {
    const { bookingId } = req.params

    const booking = await Booking.findById(bookingId)
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })
    }

    // Check if user owns this booking
    if (booking.client.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this booking",
      })
    }

    // Check if booking can be cancelled (e.g., not in the past)
    if (booking.details.eventDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel past bookings",
      })
    }

    booking.status = "cancelled"
    booking.updatedAt = Date.now()
    await booking.save()

    res.json({
      success: true,
      message: "Booking cancelled successfully",
    })
  } catch (error) {
    console.error("Cancel booking error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// Get booking statistics
router.get("/stats/summary", auth, async (req, res) => {
  try {
    const { pandalId } = req.query

    const matchQuery = {}
    if (pandalId) {
      matchQuery.serviceProvider = new mongoose.Types.ObjectId(pandalId)
    } else {
      matchQuery.client = new mongoose.Types.ObjectId(req.user.userId)
    }

    const stats = await Booking.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          confirmedBookings: {
            $sum: { $cond: [{ $eq: ["$status", "confirmed"] }, 1, 0] },
          },
          cancelledBookings: {
            $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] },
          },
          completedBookings: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
          totalPeople: { $sum: 1 }, // Count of bookings
        },
      },
    ])

    const result = stats[0] || {
      totalBookings: 0,
      confirmedBookings: 0,
      cancelledBookings: 0,
      completedBookings: 0,
      totalPeople: 0,
    }

    res.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error("Get booking stats error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

module.exports = router
