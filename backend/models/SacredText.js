const mongoose = require('mongoose');
const { Schema } = mongoose;

const SacredTextSchema = new Schema({
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, trim: true },
  description: { type: String, default: '' },
  author: { type: String },
  translator: { type: String },
  chapters: { type: Number },
  verses: { type: Number },
  language: { type: String, default: 'en' },
  downloads: { type: Number, default: 0 },
  readTimeMinutes: { type: Number, default: 0 },
  categories: [{ type: String }],
  tags: [{ type: String }],
  fileUrl: { type: String },  
  thumbnailUrl: { type: String },
  uploader: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  space: { type: Schema.Types.ObjectId, ref: 'SacredSpace', default: null }, // optional: associated space
  publishedAt: { type: Date },
}, { timestamps: true });

SacredTextSchema.index({ title: 'text', subtitle: 'text', description: 'text', tags: 'text' });
SacredTextSchema.index({ space: 1 }); // for filtering by space if needed

module.exports = mongoose.model('SacredText', SacredTextSchema);
