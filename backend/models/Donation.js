const mongoose = require("mongoose")

const donationSchema = new mongoose.Schema(
  {
    pandal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pandal",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    platformFee: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    donorInfo: {
      name: String,
      email: String,
      phone: String,
      isAnonymous: {
        type: Boolean,
        default: false,
      },
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    transactionId: String,
    completedAt: Date,
  },
  {
    timestamps: true,
  },
)

// Index for efficient queries
donationSchema.index({ pandal: 1, status: 1 })
donationSchema.index({ createdAt: -1 })

module.exports = mongoose.model("Donation", donationSchema)
