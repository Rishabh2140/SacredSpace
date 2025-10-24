// models/Project.js
const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  amount: { type: Number, default: 0 }, // payable for milestone
  status: { type: String, enum: ['pending', 'in_progress', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}, { _id: true });

const reviewSchema = new mongoose.Schema({
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
}, { _id: true });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // reference to Artist (User model)
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional (could be Samiti / Admin / Individual)
  description: { type: String, required: true },
  category: { type: String, default: 'sculpture' }, // e.g. 'sculpture','installation','miniature'
  tags: [String],

  // pricing & status
  price: { type: Number, default: 0 },        // total project value (INR)
  currency: { type: String, default: 'INR' },
  status: {
    type: String,
    enum: ['draft', 'open', 'in_progress', 'completed', 'cancelled'],
    default: 'draft'
  },

  // media
  coverImage: String,
  gallery: [String], // list of image URLs
  files: [String],   // attachments, glb models, pdfs (store URLs)

  // schedule
  startDate: Date,
  dueDate: Date,
  progressPercent: { type: Number, min: 0, max: 100, default: 0 },

  // milestones & payment breakup
  milestones: [milestoneSchema],

  // orders & communications
  inquiriesCount: { type: Number, default: 0 }, // number of inquiries
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], // optional Order refs

  // client feedback
  reviews: [reviewSchema],
  averageRating: { type: Number, min: 0, max: 5, default: 0 },

  // visibility & meta
  visibility: { type: String, enum: ['public', 'unlisted', 'private'], default: 'public' },
  featured: { type: Boolean, default: false },

  analytics: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// compute averageRating when a review is added/modified
projectSchema.methods.recalculateRating = function() {
  if (!this.reviews || this.reviews.length === 0) {
    this.averageRating = 0;
    return this.save();
  }
  const sum = this.reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
  this.averageRating = parseFloat((sum / this.reviews.length).toFixed(2));
  return this.save();
};

// simple virtual for isOverdue
projectSchema.virtual('isOverdue').get(function() {
  if (!this.dueDate || this.status === 'completed') return false;
  return new Date() > this.dueDate;
});

// keep updatedAt fresh
projectSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// text index for search
projectSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Project', projectSchema);
