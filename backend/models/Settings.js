// models/Settings.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationsSchema = new Schema({
  email: { type: Boolean, default: true },
  push: { type: Boolean, default: true },
  sms: { type: Boolean, default: false },
  prayerReminders: { type: Boolean, default: false },
  eventAlerts: { type: Boolean, default: true },
  communityUpdates: { type: Boolean, default: true },
  donationReceipts: { type: Boolean, default: true }
}, { _id: false });

const privacySchema = new Schema({
  profileVisibility: { type: String, enum: ['public','private','followers'], default: 'public' },
  showDonations: { type: Boolean, default: false },
  showActivity: { type: Boolean, default: true },
  allowMessages: { type: Boolean, default: true },
  showLocations: { type: Boolean, default: false }
}, { _id: false });

const changePasswordSchema = new Schema({
  // These fields support a secure change/reset flow; do NOT store plain passwords
  lastPasswordChangeAt: { type: Date },
  requirePasswordChange: { type: Boolean, default: false }, // e.g., force user to change on next login
  // password reset token + expiry (for forgot-password flow)
  resetToken: { type: String },
  resetTokenExpiresAt: { type: Date }
}, { _id: false });

const SettingsSchema = new Schema({
  notifications: { type: notificationsSchema, default: () => ({}) },
  privacy: { type: privacySchema, default: () => ({}) },
  changePassword: { type: changePasswordSchema, default: () => ({}) },
  // Optional: per-user UI preferences or quick toggles
  preferences: {
    language: { type: String, default: 'en' },
    theme: { type: String, enum: ['light','dark'], default: 'light' },
    timezone: { type: String, default: 'Asia/Kolkata' }
  }
}, { timestamps: true });

/**
 * Helper: create default settings object (useful in user registration)
 */
SettingsSchema.statics.createDefault = function() {
  return this.create({});
};

module.exports = mongoose.model('Settings', SettingsSchema);
