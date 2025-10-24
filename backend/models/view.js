const viewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional (anon views)
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  targetType: { type: String, enum: ['Space','User','Post'], required: true },
  ip: String,
  userAgent: String
}, { timestamps: true });
module.exports = mongoose.model('View', viewSchema);