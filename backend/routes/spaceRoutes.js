const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spacesController');
const { auth } = require('../middleware/auth');

// --------------------
// Public routes
// --------------------

// List spaces with filters, pagination, geo-search
router.get('/', spaceController.list);

// Get a single space by ID
router.get('/:id', spaceController.getById);

// --------------------
// Protected routes (admin or authorized users)
// --------------------

// Create a new space (only admin or authenticated user)
router.post('/', auth, spaceController.create);

// Update an existing space
router.put('/:id', auth, spaceController.update);

module.exports = router;
