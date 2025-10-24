const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // requester
  guide: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // pujaris/guides
  space: { type: mongoose.Schema.Types.ObjectId, ref: 'SacredSpace' },
  service: String,
  date: Date,
  amount: Number,
  status: { type: String, enum:['pending','confirmed','completed','cancelled'], default:'pending' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Booking', bookingSchema);
