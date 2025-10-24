const mongoose = require('mongoose');
const portfolioSchema = new mongoose.Schema({
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  category: String,
  price: Number,
  images: [String],
  videos: [String],
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  ratingAvg: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('PortfolioItem', portfolioSchema);
