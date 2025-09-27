const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "targetType",
    },
    targetType: {
      type: String,
      required: true,
      enum: ["User", "Pandal"],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      trim: true,
    },
    aspects: {
      // For Pandal ratings
      decoration: Number,
      organization: Number,
      accessibility: Number,
      // For User ratings (Samiti, Murtikar, etc.)
      quality: Number,
      communication: Number,
      timeliness: Number,
      professionalism: Number,
    },
  },
  {
    timestamps: true,
  },
)

// Ensure one rating per user per target
ratingSchema.index({ user: 1, target: 1 }, { unique: true })

module.exports = mongoose.model("Rating", ratingSchema)
