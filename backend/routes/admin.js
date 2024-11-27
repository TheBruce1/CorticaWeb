const express = require('express');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Middleware for admin-only access
const isAdmin = roleMiddleware(['Admin']);

// Get All Users
router.get('/users', [authMiddleware, isAdmin], async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add Teacher
router.post('/teachers', [authMiddleware, isAdmin], async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password, role: 'Teacher' });
        await newUser.save();
        res.status(201).send('Teacher added successfully');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Disable User Login
router.patch('/users/:id/disable', [authMiddleware, isAdmin], async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');
        user.active = false;
        await user.save();
        res.send('User login disabled');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
