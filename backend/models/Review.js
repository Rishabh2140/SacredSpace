const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  targetType: { type: String, enum: ['SacredSpace','User','PortfolioItem','Event'], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  rating: { type: Number, min: 1, max: 5 },
  text: String,
  createdAt: { type: Date, default: Date.now }
});
reviewSchema.index({ targetType: 1, targetId: 1 });
module.exports = mongoose.model('Review', reviewSchema);
