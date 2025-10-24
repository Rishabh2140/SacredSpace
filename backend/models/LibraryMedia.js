const mongoose = require('mongoose');
const { Schema } = mongoose;

const LibraryMediaSchema = new Schema({
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, trim: true },
  description: { type: String, default: '' },
  type: { 
    type: String, 
    enum: ['audio','video','chant','guided_meditation','lecture','other'],
    required: true
  },
  durationSeconds: { type: Number, default: 0 },
  author: { type: String },
  uploader: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  space: { type: Schema.Types.ObjectId, ref: 'SacredSpace', default: null }, // optional: associated space
  fileUrl: { type: String },     
  thumbnailUrl: { type: String },
  views: { type: Number, default: 0 },
  plays: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  categories: [{ type: String }],
  tags: [{ type: String }],
  source: { type: String }, 
  language: { type: String, default: 'en' },
  publishedAt: { type: Date },
}, { timestamps: true });

LibraryMediaSchema.index({ title: 'text', subtitle: 'text', description: 'text', tags: 'text' });
LibraryMediaSchema.index({ space: 1 }); // fast filtering by space

module.exports = mongoose.model('LibraryMedia', LibraryMediaSchema);
