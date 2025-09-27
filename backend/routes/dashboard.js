const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const User = require("../models/User")
const Pandal = require("../models/Pandal")
const Booking = require("../models/Booking")
const Rating = require("../models/Rating")
const auth = require("../middleware/auth")

// Get dashboard stats
router.get("/stats", auth, async (req, res) => {
  try {
    const userId = req.user.userId
    const currentDate = new Date()
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    const thisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)

    // Get bookings stats
    const totalBookings = await Booking.countDocuments({ serviceProvider: userId })
    const thisMonthBookings = await Booking.countDocuments({
      serviceProvider: userId,
      createdAt: { $gte: thisMonth },
    })
    const lastMonthBookings = await Booking.countDocuments({
      serviceProvider: userId,
      createdAt: { $gte: lastMonth, $lt: thisMonth },
    })

    // Get earnings stats
    const thisMonthEarnings = await Booking.aggregate([
      {
        $match: {
          serviceProvider: new mongoose.Types.ObjectId(userId),
          status: "completed",
          createdAt: { $gte: thisMonth },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$pricing.amount" },
        },
      },
    ])

    const lastMonthEarnings = await Booking.aggregate([
      {
        $match: {
          serviceProvider: new mongoose.Types.ObjectId(userId),
          status: "completed",
          createdAt: { $gte: lastMonth, $lt: thisMonth },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$pricing.amount" },
        },
      },
    ])

    // Get rating stats
    const ratings = await Rating.find({ target: userId, targetType: "User" })
    const averageRating =
      ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length : 0

    // Get active projects
    const activeProjects = await Booking.countDocuments({
      serviceProvider: userId,
      status: { $in: ["confirmed", "in-progress"] },
    })

    // Calculate percentage changes
    const bookingChange =
      lastMonthBookings > 0 ? ((thisMonthBookings - lastMonthBookings) / lastMonthBookings) * 100 : 0

    const earningsChange =
      lastMonthEarnings[0]?.total > 0
        ? (((thisMonthEarnings[0]?.total || 0) - lastMonthEarnings[0].total) / lastMonthEarnings[0].total) * 100
        : 0

    res.json({
      totalBookings,
      monthlyEarnings: thisMonthEarnings[0]?.total || 0,
      averageRating: averageRating.toFixed(1),
      activeProjects,
      bookingChange: bookingChange.toFixed(1),
      earningsChange: earningsChange.toFixed(1),
      ratingChange: 0, // This would require historical rating data
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get recent bookings
router.get("/bookings", auth, async (req, res) => {
  try {
    const userId = req.user.userId
    const bookings = await Booking.find({ serviceProvider: userId })
      .populate("client", "name email")
      .sort({ createdAt: -1 })
      .limit(10)

    const formattedBookings = bookings.map((booking) => ({
      _id: booking._id,
      eventName: booking.details.title,
      clientName: booking.client.name,
      date: booking.details.eventDate,
      amount: booking.pricing.amount,
      status: booking.status,
      createdAt: booking.createdAt,
    }))

    res.json(formattedBookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get earnings data
router.get("/earnings", auth, async (req, res) => {
  try {
    const userId = req.user.userId
    const earnings = await Booking.aggregate([
      {
        $match: {
          serviceProvider: new mongoose.Types.ObjectId(userId),
          status: "completed",
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$details.eventDate" },
            month: { $month: "$details.eventDate" },
          },
          total: { $sum: "$pricing.amount" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1 },
      },
      {
        $limit: 12,
      },
    ])

    res.json(earnings)
  } catch (error) {
    console.error("Error fetching earnings:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get recent reviews
router.get("/reviews", auth, async (req, res) => {
  try {
    const userId = req.user.userId
    const reviews = await Rating.find({ target: userId, targetType: "User" }).populate("user", "name").sort({ createdAt: -1 }).limit(10)

    const formattedReviews = reviews.map((review) => ({
      _id: review._id,
      clientName: review.user.name,
      rating: review.rating,
      comment: review.review,
      date: review.createdAt,
    }))

    res.json(formattedReviews)
  } catch (error) {
    console.error("Error fetching reviews:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
