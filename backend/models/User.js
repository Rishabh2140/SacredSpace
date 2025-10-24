// models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  email: { type: String, required: true, unique: true, index: true, trim: true },
  // hide password by default when selecting users
  passwordHash: { type: String, select: false },
  role: { type: String, enum: ['common','artist','guide','admin'], default: 'common' },

  // Geo location: { type: "Point", coordinates: [lng, lat] }
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] } // [lng, lat]
  },

  bio: { type: String, default: '' },
  joinedAt: { type: Date, default: Date.now },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  // Reference to a reusable Settings document (create per-user on signup)
  settings: { type: Schema.Types.ObjectId, ref: 'Settings', default: null },

  /* ---------------- Role-specific subdocuments ---------------- */

  artistData: {
    businessName: { type: String },
    specialisation: { type: String },
    experienceYears: { type: Number },
    portfolioCount: { type: Number, default: 0 },
    ratingsAvg: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
    workshopAddress: { type: String },
    hours: { type: Map, of: String },
    // Relations
    relatedProjects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    relatedSpaces:   [{ type: Schema.Types.ObjectId, ref: 'SacredSpace' }]
  },

  guideData: {
    expertiseArea: { type: String },
    experienceYears: { type: Number },
    verified: { type: Boolean, default: false },
    availability: { type: Map, of: String }
  },

  adminData: {
    managingSpaces: [{ type: Schema.Types.ObjectId, ref: 'SacredSpace' }],
    managingEvents: [{ type: Schema.Types.ObjectId, ref: 'LiveEvent' }],
    organization: { type: String },
    yearManaging: { type: Number }
  },

  /* ---------------- Bookmark arrays (separate) ---------------- */
  // Library bookmarks: only items from library (SacredText & LibraryMedia)
  libraryBookmarks: [{
    itemId: { type: Schema.Types.ObjectId, required: true },
    kind: { type: String, enum: ['SacredText', 'LibraryMedia'], required: true },
    note: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],

  // Bookmarked spaces
  spaceBookmarks: [{
    spaceId: { type: Schema.Types.ObjectId, ref: 'SacredSpace', required: true },
    note: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],

  // Bookmarked live events
  eventBookmarks: [{
    eventId: { type: Schema.Types.ObjectId, ref: 'LiveEvent', required: true },
    note: { type: String },
    createdAt: { type: Date, default: Date.now }
  }]

}, { timestamps: true });

/* 2dsphere index for geo queries */
userSchema.index({ location: '2dsphere' });

/* ---------------- Instance methods: toggle + getters ---------------- */

/**
 * Toggle library bookmark (SacredText or LibraryMedia).
 * Returns { action: 'added'|'removed', itemId, kind }
 */
userSchema.methods.toggleLibraryBookmark = async function(itemId, kind, note) {
  if (!['SacredText', 'LibraryMedia'].includes(kind)) throw new Error('Invalid library-kind');
  const oidStr = String(itemId);
  const idx = this.libraryBookmarks.findIndex(b => String(b.itemId) === oidStr && b.kind === kind);
  if (idx >= 0) {
    this.libraryBookmarks.splice(idx, 1);
    await this.save();
    return { action: 'removed', itemId: itemId, kind };
  } else {
    this.libraryBookmarks.push({ itemId: mongoose.Types.ObjectId(itemId), kind, note: note || null, createdAt: new Date() });
    await this.save();
    return { action: 'added', itemId: itemId, kind };
  }
};

/**
 * Toggle space bookmark.
 * Returns { action: 'added'|'removed', spaceId }
 */
userSchema.methods.toggleSpaceBookmark = async function(spaceId, note) {
  const oidStr = String(spaceId);
  const idx = this.spaceBookmarks.findIndex(s => String(s.spaceId) === oidStr);
  if (idx >= 0) {
    this.spaceBookmarks.splice(idx, 1);
    await this.save();
    return { action: 'removed', spaceId };
  } else {
    this.spaceBookmarks.push({ spaceId: mongoose.Types.ObjectId(spaceId), note: note || null, createdAt: new Date() });
    await this.save();
    return { action: 'added', spaceId };
  }
};

/**
 * Toggle event bookmark.
 * Returns { action: 'added'|'removed', eventId }
 */
userSchema.methods.toggleEventBookmark = async function(eventId, note) {
  const oidStr = String(eventId);
  const idx = this.eventBookmarks.findIndex(e => String(e.eventId) === oidStr);
  if (idx >= 0) {
    this.eventBookmarks.splice(idx, 1);
    await this.save();
    return { action: 'removed', eventId };
  } else {
    this.eventBookmarks.push({ eventId: mongoose.Types.ObjectId(eventId), note: note || null, createdAt: new Date() });
    await this.save();
    return { action: 'added', eventId };
  }
};

/**
 * Get populated library bookmarks preserving bookmark order.
 * Returns array of { kind, item, createdAt, note }.
 */
userSchema.methods.getLibraryBookmarks = async function() {
  const SacredText = mongoose.model('SacredText');
  const LibraryMedia = mongoose.model('LibraryMedia');

  const sacredIds = this.libraryBookmarks.filter(b => b.kind === 'SacredText').map(b => b.itemId);
  const mediaIds  = this.libraryBookmarks.filter(b => b.kind === 'LibraryMedia').map(b => b.itemId);

  const [texts, medias] = await Promise.all([
    sacredIds.length ? SacredText.find({ _id: { $in: sacredIds } }).lean() : Promise.resolve([]),
    mediaIds.length ? LibraryMedia.find({ _id: { $in: mediaIds } }).lean() : Promise.resolve([])
  ]);

  return this.libraryBookmarks.map(b => {
    const item = b.kind === 'SacredText'
      ? texts.find(t => String(t._id) === String(b.itemId))
      : medias.find(m => String(m._id) === String(b.itemId));
    return { kind: b.kind, item: item || null, createdAt: b.createdAt, note: b.note || null };
  });
};

/**
 * Get populated space bookmarks in order: returns [{ space, createdAt, note }]
 */
userSchema.methods.getSpaceBookmarks = async function() {
  const SacredSpace = mongoose.model('SacredSpace');
  const ids = this.spaceBookmarks.map(s => s.spaceId);
  const spaces = ids.length ? await SacredSpace.find({ _id: { $in: ids } }).lean() : [];
  return this.spaceBookmarks.map(s => {
    const found = spaces.find(sp => String(sp._id) === String(s.spaceId));
    return { space: found || null, createdAt: s.createdAt, note: s.note || null };
  });
};

/**
 * Get populated event bookmarks in order: returns [{ event, createdAt, note }]
 */
userSchema.methods.getEventBookmarks = async function() {
  const LiveEvent = mongoose.model('LiveEvent');
  const ids = this.eventBookmarks.map(e => e.eventId);
  const events = ids.length ? await LiveEvent.find({ _id: { $in: ids } }).lean() : [];
  return this.eventBookmarks.map(e => {
    const found = events.find(ev => String(ev._id) === String(e.eventId));
    return { event: found || null, createdAt: e.createdAt, note: e.note || null };
  });
};

module.exports = mongoose.model('User', userSchema);
