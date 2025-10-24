const express = require("express")
const router = express.Router()
const Donation = require("../models/Donation")
const SacredSpace = require("../models/SacredSpace")
const auth = require("../middleware/auth")

// Create a new donation
router.post("/", async (req, res) => {
  try {
    const { spaceId, amount, donorInfo } = req.body

    // Validate space exists
    const space = await SacredSpace.findById(spaceId)
    if (!space) {
      return res.status(404).json({ message: "Space not found" })
    }

    // Calculate platform fee (5%)
    const platformFee = Math.round(amount * 0.05)
    const totalAmount = amount + platformFee

    const donation = new Donation({
      space: spaceId,
      amount,
      platformFee,
      totalAmount,
      donorInfo,
      status: "pending",
    })

    await donation.save()

    const paymentUrl = `https://payment-gateway.com/pay?amount=${totalAmount}&ref=${donation._id}`

    res.status(201).json({
      donation,
      paymentUrl,
      message: "Donation created successfully",
    })
  } catch (error) {
    console.error("Error creating donation:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get donations for a space
router.get("/space/:spaceId", async (req, res) => {
  try {
    const { spaceId } = req.params

    const donations = await Donation.find({
      space: spaceId,
      status: "completed",
    })
      .select("-donorInfo.email -donorInfo.phone")
      .sort({ createdAt: -1 })

    const totalRaised = donations.reduce((sum, donation) => sum + donation.amount, 0)
    const donorCount = donations.filter((d) => !d.donorInfo.isAnonymous).length

    res.json({
      donations,
      totalRaised,
      donorCount,
    })
  } catch (error) {
    console.error("Error fetching donations:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update donation status (webhook from payment gateway)
router.post("/webhook/payment-status", async (req, res) => {
  try {
    const { donationId, status, transactionId } = req.body

    const donation = await Donation.findById(donationId)
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" })
    }

    donation.status = status
    donation.transactionId = transactionId
    donation.completedAt = status === "completed" ? new Date() : null

    await donation.save()

    res.json({ message: "Donation status updated" })
  } catch (error) {
    console.error("Error updating donation status:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
