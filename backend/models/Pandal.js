const mongoose = require("mongoose")

const pandalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pandal name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    type: {
      type: String,
      enum: ["pandal", "temple", "mosque", "church", "gurudwara"],
      required: true,
    },
    category: {
      type: String,
      enum: ["Ganesh", "Durga", "Kali", "Saraswati", "Lakshmi", "Other"],
      required: function () {
        return this.type === "pandal"
      },
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      coordinates: {
        lat: {
          type: Number,
          required: true,
        },
        lng: {
          type: Number,
          required: true,
        },
      },
    },
    samiti: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.type === "pandal"
      },
    },
    murtikar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.type === "pandal"
      },
    },
    pujari: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    media: {
      images: [String],
      videos: [String],
      virtualTour: {
        url: String,
        type: {
          type: String,
          enum: ["360", "3d", "vr"],
        },
      },
    },
    liveStream: {
      isLive: {
        type: Boolean,
        default: false,
      },
      streamUrl: String,
      schedule: [
        {
          title: String,
          startTime: Date,
          endTime: Date,
          description: String,
        },
      ],
    },
    events: [
      {
        name: String,
        description: String,
        startDate: Date,
        endDate: Date,
        timings: [
          {
            activity: String,
            time: String,
          },
        ],
      },
    ],
    features: [String], // ['Wheelchair Accessible', 'Parking', 'Food Stall', etc.]
    ratings: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    visitors: {
      total: {
        type: Number,
        default: 0,
      },
      today: {
        type: Number,
        default: 0,
      },
    },
    donations: {
      total: {
        type: Number,
        default: 0,
      },
      goal: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Index for geospatial queries
pandalSchema.index({ "location.coordinates": "2dsphere" })

module.exports = mongoose.model("Pandal", pandalSchema)
