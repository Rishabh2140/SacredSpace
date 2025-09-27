const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Get user profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update user profile
router.put("/profile", auth, async (req, res) => {
  try {
    const { name, email, bio, location } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ success: false, message: "Email already in use" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.profile.bio = bio || user.profile.bio;
    user.profile.location = location || user.profile.location;
    user.updatedAt = Date.now();

    await user.save();
    res.json({ success: true, data: user, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Change password
router.put("/change-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return res.status(400).json({ success: false, message: "Current password and new password are required" });

    const user = await User.findById(req.user.userId).select("+password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Current password is incorrect" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.updatedAt = Date.now();

    await user.save();
    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get user stats
router.get("/stats", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const stats = {
      totalBookings: user.businessMetrics?.totalBookings || 0,
      totalEarnings: user.businessMetrics?.totalEarnings || 0,
      completedProjects: user.businessMetrics?.completedProjects || 0,
      averageRating: user.ratings?.average || 0,
      ratingCount: user.ratings?.count || 0,
      joinDate: user.createdAt,
      lastActive: user.updatedAt,
    };

    res.json({ success: true, data: stats });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update user activity
router.post("/activity", auth, async (req, res) => {
  try {
    const { type, value = 1 } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (!user.businessMetrics) user.businessMetrics = { totalBookings: 0, totalEarnings: 0, completedProjects: 0 };

    switch (type) {
      case "booking": user.businessMetrics.totalBookings += value; break;
      case "earning": user.businessMetrics.totalEarnings += value; break;
      case "project": user.businessMetrics.completedProjects += value; break;
      default: return res.status(400).json({ success: false, message: "Invalid activity type" });
    }

    await user.save();
    res.json({ success: true, data: user.businessMetrics, message: "Activity updated successfully" });
  } catch (error) {
    console.error("Update activity error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
