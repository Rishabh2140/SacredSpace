const bookmarkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  space: { type: mongoose.Schema.Types.ObjectId, ref: 'Space' },
}, { timestamps: true });
bookmarkSchema.index({ user: 1, space: 1 }, { unique: true });
module.exports = mongoose.model('Bookmark', bookmarkSchema);