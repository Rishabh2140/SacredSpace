const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  targetType: { type: String, enum: ['Space','User','Post'], required: true },
  text: { type: String },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } // reply
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);