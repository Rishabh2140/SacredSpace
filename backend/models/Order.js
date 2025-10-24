const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  amount: Number,
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['inquiry','pending','in_progress','completed','cancelled'], default: 'inquiry' },
  progress: { type: Number, default: 0 },
  dueDate: Date,
  priority: { type: String, enum: ['low','medium','high'], default: 'medium' },
  createdAt: { type: Date, default: Date.now }
});
orderSchema.index({ artist: 1, status: 1 });
module.exports = mongoose.model('Order', orderSchema);
