// src/models/Rating.js
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Space or User
  targetType: { type: String, enum: ['Space','User'], required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
  review: String,
  attributes: Object // e.g. { cleanliness:5, pujaQuality:4 }
}, { timestamps: true });

ratingSchema.index({ user: 1, targetId: 1, targetType: 1 }, { unique: true }); // one rating per user per target

module.exports = mongoose.model('Rating', ratingSchema);
