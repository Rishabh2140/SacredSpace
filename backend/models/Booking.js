const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceType: {
      type: String,
      enum: ["murtikar", "pujari", "kathavachak"],
      required: true,
    },
    details: {
      title: String,
      description: String,
      requirements: String,
      eventDate: Date,
      duration: Number, // in hours
      location: {
        address: String,
        city: String,
        coordinates: {
          lat: Number,
          lng: Number,
        },
      },
    },
    pricing: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        default: "INR",
      },
      paymentStatus: {
        type: String,
        enum: ["pending", "paid", "refunded"],
        default: "pending",
      },
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
      default: "pending",
    },
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        message: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Booking", bookingSchema)
