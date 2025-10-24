const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, ownerOrAdmin } = require('../middleware/auth');

// Public
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Protected
router.get('/:id', auth, userController.getUser);
router.put('/:id', auth, userController.updateUser);

// Bookmarks
router.post('/:id/bookmark/library', auth, userController.toggleLibraryBookmark);
router.post('/:id/bookmark/space', auth, userController.toggleSpaceBookmark);
router.post('/:id/bookmark/event', auth, userController.toggleEventBookmark);
router.get('/:id/bookmarks', auth, userController.getBookmarks);

module.exports = router;
