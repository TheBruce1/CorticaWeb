const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Multer setup for profile pictures
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Get Profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update Profile
router.put('/profile', [authMiddleware, upload.single('profilePicture')], async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send('User not found');

        user.name = req.body.name || user.name;
        user.contact = req.body.contact || user.contact;
        if (req.file) user.profilePicture = `/uploads/${req.file.filename}`;

        await user.save();
        res.send('Profile updated successfully');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Change Password
router.put('/change-password', authMiddleware, async (req, res) => {
    const { password } = req.body;

    if (!password) return res.status(400).send('Password is required');

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send('User not found');

        user.password = password; // The `save` hook will hash the password automatically.
        await user.save();
        res.send('Password changed successfully');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Register User
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).send('User already exists');

        // Create new user
        user = new User({ name, email, password, role });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
