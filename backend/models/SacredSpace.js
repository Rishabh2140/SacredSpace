const mongoose = require('mongoose');

const threeDViewSchema = new mongoose.Schema({
  title: String,
  type: { type: String, enum: ['panorama','glb','gltf','embed'], default: 'panorama' },
  url: String,
  views: { type: Number, default: 0 }
}, { _id: false });

const sacredSpaceSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  type: { type: String, enum: ['pandal','temple','church','mosque','gurudwara','buddhist_center'], required: true },
  description: String,
  location: {
    address: String,
    coordinates: { type: [Number], default: [0,0] } // [lng, lat]
  },
  administrator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  samiti: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // committee members
  artists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // murtikar
  pujaris: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // guides/priests
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  images: [String], // image URLs
  videos: [String],
  threeDViews: [threeDViewSchema],

  /** New fields for events and library items **/
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LiveEvent' }],          // associated live events
  libraryItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LibraryMedia' }], // associated media
  sacredTexts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SacredText' }],    // associated texts

  eventsCount: { type: Number, default: 0 },
  visitorsCount: { type: Number, default: 0 },
  ratingAvg: { type: Number, default: 0 },
  visibility: { type: String, enum: ['public','private'], default: 'public' },
  statistics: {
    dailyViews: [{ date: Date, views: Number }],
    monthlyDonations: [{ month: String, amount: Number }]
  },
  quickActions: {
    scheduleVisit: { type: Boolean, default: true },
    contact: { type: Boolean, default: true },
    subscribeUpdates: { type: Boolean, default: true },
    officialWebsite: String
  },
  createdAt: { type: Date, default: Date.now }
});

// 2dsphere index for geo queries
sacredSpaceSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('SacredSpace', sacredSpaceSchema);
