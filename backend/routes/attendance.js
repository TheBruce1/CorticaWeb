const express = require('express');
const multer = require('multer');
const Attendance = require('../models/Attendance');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Multer setup for selfies
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Mark Attendance
router.post('/mark', authMiddleware, upload.single('selfie'), async (req, res) => {
    try {
        const attendance = new Attendance({
            studentId: req.user.id,
            selfie: `/uploads/${req.file.filename}`,
        });
        await attendance.save();
        res.status(201).send('Attendance marked successfully');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get Attendance History
router.get('/history', authMiddleware, async (req, res) => {
    try {
        const history = await Attendance.find({ studentId: req.user.id });
        res.json(history);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
