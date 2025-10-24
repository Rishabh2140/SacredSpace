const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now, // Tracks the day of the analytics
  },
  totalUsers: {
    type: Number,
    default: 0,
  },
  totalSacredSpaces: {
    type: Number,
    default: 0,
  },
  totalArtists: {
    type: Number,
    default: 0,
  },
  totalAdministrators: {
    type: Number,
    default: 0,
  },
  dailyVisitors: {
    type: Number,
    default: 0,
  },
  newUsers: {
    type: Number,
    default: 0, // Tracks new registrations per day
  },
  activeUsers: {
    type: Number,
    default: 0, // Tracks unique users who visited that day
  },
  pageViews: {
    type: Number,
    default: 0, // Total page views of the website
  },
  mostVisitedSacredSpace: {
    type: String, // Can store SacredSpace ID or name
    default: null,
  },
  averageSessionDuration: {
    type: Number,
    default: 0, // in seconds, can be calculated from session tracking
  },
  bounceRate: {
    type: Number,
    default: 0, // percentage of visitors leaving quickly
  },
  topReferrers: {
    type: [String], // URLs or platforms sending traffic
    default: [],
  },
  devices: {
    type: Map, // e.g., { mobile: 10, desktop: 15, tablet: 5 }
    of: Number,
    default: {},
  },
  countries: {
    type: Map, // e.g., { India: 10, USA: 5 }
    of: Number,
    default: {},
  },
  dailyRegistrationsByType: {
    type: Map, // e.g., { user: 10, artist: 2, admin: 1 }
    of: Number,
    default: {},
  }
});

// Optional: auto-update `updatedAt` on every modification
analyticsSchema.set('timestamps', true);

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;
