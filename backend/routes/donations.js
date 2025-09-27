const express = require("express")
const router = express.Router()
const Donation = require("../models/Donation")
const Pandal = require("../models/Pandal")
const auth = require("../middleware/auth")

// Create a new donation
router.post("/", async (req, res) => {
  try {
    const { pandalId, amount, donorInfo } = req.body

    // Validate pandal exists
    const pandal = await Pandal.findById(pandalId)
    if (!pandal) {
      return res.status(404).json({ message: "Pandal not found" })
    }

    // Calculate platform fee (5%)
    const platformFee = Math.round(amount * 0.05)
    const totalAmount = amount + platformFee

    const donation = new Donation({
      pandal: pandalId,
      amount,
      platformFee,
      totalAmount,
      donorInfo,
      status: "pending",
    })

    await donation.save()

    // In a real implementation, integrate with payment gateway
    // For now, we'll simulate a payment URL
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

// Get donations for a pandal
router.get("/pandal/:pandalId", async (req, res) => {
  try {
    const { pandalId } = req.params

    const donations = await Donation.find({
      pandal: pandalId,
      status: "completed",
    })
      .select("-donorInfo.email -donorInfo.phone") // Hide sensitive info
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
