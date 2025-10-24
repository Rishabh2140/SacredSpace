// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * auth - middleware to verify JWT from Authorization header.
 * Usage: router.get('/some', auth, handler)
 */
const auth = async (req, res, next) => {
  try {
    const raw = req.header('Authorization') || req.header('authorization') || req.header('x-access-token');
    const token = raw ? raw.replace(/^Bearer\s+/i, '').trim() : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    let decoded;
    try {
      const secret = process.env.JWT_SECRET || 'your-secret-key';
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token.',
        error: err.message
      });
    }

    const userId = decoded.id || decoded.userId || decoded._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Invalid token payload.' });
    }

    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token. User not found.' });
    }

    req.user = {
      id: String(user._id),
      role: user.role,
      email: user.email,
      fullName: user.fullName
    };

    req.userDoc = user;

    next();
  } catch (error) {
    console.error('auth middleware error:', error);
    res.status(500).json({ success: false, message: 'Server error during authentication.', error: error.message });
  }
};

/**
 * requireRole(...roles) - allow only users whose role is in allowed list
 */
const requireRole = (...allowedRoles) => (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: 'Not authenticated.' });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden. Insufficient privileges.' });
    }
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * ownerOrAdmin - allow action if authenticated user is resource owner (req.params.id) or admin
 */
const ownerOrAdmin = (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: 'Not authenticated.' });
    const isOwner = req.user.id === req.params.id;
    if (isOwner || req.user.role === 'admin') return next();
    return res.status(403).json({ success: false, message: 'Forbidden. Insufficient privileges.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { auth, requireRole, ownerOrAdmin };
