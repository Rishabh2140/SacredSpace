const express = require("express")
const Booking = require("../models/Booking")
const SacredSpace = require("../models/SacredSpace")
const mongoose = require("mongoose") // Import mongoose
const {auth} = require("../middleware/auth")

const router = express.Router()

// Create a booking
router.post("/", auth, async (req, res) => {
  try {
    const { spaceId, bookingDate, specialRequests } = req.body

    if (!spaceId || !bookingDate) {
      return res.status(400).json({ success: false, message: "Space ID and booking date are required" })
    }

    const space = await SacredSpace.findById(spaceId)
    if (!space) return res.status(404).json({ success: false, message: "Space not found" })

    const bookingDateTime = new Date(bookingDate)
    if (bookingDateTime <= new Date()) {
      return res.status(400).json({ success: false, message: "Booking date must be in the future" })
    }

    const provider =
      space.administrator || (Array.isArray(space.samiti) && space.samiti.length > 0 ? space.samiti[0] : null)

    const booking = new Booking({
      client: req.user.userId,
      serviceProvider: provider || undefined,
      serviceType: "space",
      space: space._id,
      details: {
        title: `Visit to ${space.name}`,
        description: specialRequests || "General visit",
        eventDate: bookingDateTime,
        duration: 2,
        location: space.location,
      },
      pricing: { amount: 0, currency: "INR" },
      status: "pending",
    })

    await booking.save()

    const populatedBooking = await Booking.findById(booking._id)
      .populate("serviceProvider", "fullName email")
      .populate("client", "fullName email")

    res.status(201).json({ success: true, data: populatedBooking, message: "Booking created successfully" })
  } catch (error) {
    console.error("Create booking error:", error)
    res.status(500).json({ success: false, message: "Server error" })
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
      .populate("serviceProvider", "fullName email")
      .populate("client", "fullName email")
      .sort({ "details.eventDate": -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))

    const total = await Booking.countDocuments(query)

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    })
  } catch (error) {
    console.error("Get user bookings error:", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

// Get bookings for a space
router.get("/space/:spaceId", auth, async (req, res) => {
  try {
    const { spaceId } = req.params
    const { page = 1, limit = 10, status, date } = req.query

    const space = await SacredSpace.findById(spaceId)
    if (!space) return res.status(404).json({ success: false, message: "Space not found" })

    const query = { space: spaceId }
    if (status && status !== "all") query.status = status
    if (date) {
      const startDate = new Date(date)
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 1)
      query["details.eventDate"] = { $gte: startDate, $lt: endDate }
    }

    const bookings = await Booking.find(query)
      .populate("client", "fullName email")
      .sort({ "details.eventDate": -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))

    const total = await Booking.countDocuments(query)

    res.json({
      success: true,
      data: {
        bookings,
        pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) },
      },
    })
  } catch (error) {
    console.error("Get space bookings error:", error)
    res.status(500).json({ success: false, message: "Server error" })
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
      .populate("serviceProvider", "fullName email")
      .populate("client", "fullName email")

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

// Get booking statistics (by space or by client)
router.get("/stats/summary", auth, async (req, res) => {
  try {
    const { spaceId } = req.query
    const matchQuery = {}

    if (spaceId) {
      matchQuery.space = new mongoose.Types.ObjectId(spaceId)
    } else {
      matchQuery.client = new mongoose.Types.ObjectId(req.user.userId)
    }

    const stats = await Booking.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          confirmedBookings: { $sum: { $cond: [{ $eq: ["$status", "confirmed"] }, 1, 0] } },
          cancelledBookings: { $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] } },
          completedBookings: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
        },
      },
    ])

    const result = stats[0] || {
      totalBookings: 0,
      confirmedBookings: 0,
      cancelledBookings: 0,
      completedBookings: 0,
    }

    res.json({ success: true, data: result })
  } catch (error) {
    console.error("Get booking stats error:", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

module.exports = router
