const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Settings = require('../models/Settings');

// --------------------- Signup ---------------------
exports.signup = async (req, res) => {
  try {
    const { fullName, email, password, phone, role, location, bio } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create default settings
    const settings = await Settings.createDefault();

    // Create user
    const newUser = await User.create({
      fullName,
      email,
      phone,
      role: role || 'common',
      passwordHash,
      location: location || { type: 'Point', coordinates: [0, 0] },
      bio: bio || '',
      settings: settings._id
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      userId: newUser._id,
      role: newUser.role,
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// --------------------- Login ---------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, userId: user._id, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// --------------------- Get User ---------------------
exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .populate('settings')
      .lean();

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// --------------------- Update User ---------------------
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Prevent role override if not admin
    if (updateData.role) delete updateData.role;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).lean();
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// --------------------- Toggle Library Bookmark ---------------------
exports.toggleLibraryBookmark = async (req, res) => {
  try {
    const { itemId, kind, note } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const result = await user.toggleLibraryBookmark(itemId, kind, note);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// --------------------- Toggle Space Bookmark ---------------------
exports.toggleSpaceBookmark = async (req, res) => {
  try {
    const { spaceId, note } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const result = await user.toggleSpaceBookmark(spaceId, note);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// --------------------- Toggle Event Bookmark ---------------------
exports.toggleEventBookmark = async (req, res) => {
  try {
    const { eventId, note } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const result = await user.toggleEventBookmark(eventId, note);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// --------------------- Get Bookmarks ---------------------
exports.getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const library = await user.getLibraryBookmarks();
    const spaces = await user.getSpaceBookmarks();
    const events = await user.getEventBookmarks();

    res.json({ library, spaces, events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
