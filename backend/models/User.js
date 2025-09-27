const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["devotee", "samiti", "murtikar", "pujari", "kathavachak", "admin"],
      default: "devotee",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      code: String,
      expiresAt: Date,
    },
    profile: {
      avatar: String,
      bio: String,
      location: {
        address: String,
        city: String,
        state: String,
        coordinates: {
          lat: Number,
          lng: Number,
        },
      },
      // For Samiti (Committee)
      samiti: {
        name: String,
        establishedYear: Number,
        members: Number,
        specialization: [String], // ['Ganesh', 'Durga', 'Kali', etc.]
        achievements: [String],
        socialMedia: {
          facebook: String,
          instagram: String,
          youtube: String,
        },
      },
      // For Murtikar (Idol Maker)
      murtikar: {
        experience: Number,
        specialization: [String],
        portfolio: [String], // Image URLs
        priceRange: {
          min: Number,
          max: Number,
        },
        materials: [String], // ['Clay', 'Plaster', 'Fiber', etc.]
        completedWorks: Number,
      },
      // For Pujari (Priest)
      pujari: {
        experience: Number,
        languages: [String],
        specialization: [String], // ['Wedding', 'Puja', 'Havan', etc.]
        availability: {
          days: [String],
          timeSlots: [String],
        },
        charges: {
          hourly: Number,
          event: Number,
        },
      },
      // For Kathavachak (Storyteller)
      kathavachak: {
        experience: Number,
        languages: [String],
        topics: [String], // ['Ramayana', 'Mahabharata', 'Bhagavad Gita', etc.]
        eventTypes: [String], // ['Religious', 'Cultural', 'Educational']
        charges: {
          perSession: Number,
          perDay: Number,
        },
      },
    },
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
    businessMetrics: {
      totalBookings: {
        type: Number,
        default: 0,
      },
      totalEarnings: {
        type: Number,
        default: 0,
      },
      completedProjects: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model("User", userSchema)
