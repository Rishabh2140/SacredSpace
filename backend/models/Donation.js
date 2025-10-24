const mongoose = require('mongoose');
const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  space: { type: mongoose.Schema.Types.ObjectId, ref: 'SacredSpace' },
  amount: Number,
  currency: { type: String, default: 'INR' },
  purpose: String,
  createdAt: { type: Date, default: Date.now },
  anonymous: { type: Boolean, default: false }
});
donationSchema.index({ space: 1, createdAt: -1 });
module.exports = mongoose.model('Donation', donationSchema);
