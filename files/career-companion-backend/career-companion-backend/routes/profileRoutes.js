const express = require('express');
const { createProfile, getProfile, updateProfile } = require('../controllers/profileController');
const { profileValidator } = require('../middleware/validators/profileValidator');
const validateRequest = require('../middleware/validateRequest');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All profile routes require authentication
router.use(protect);

// @route   POST /api/profile
router.post('/', profileValidator, validateRequest, createProfile);

// @route   GET /api/profile
router.get('/', getProfile);

// @route   PUT /api/profile
router.put('/', profileValidator, validateRequest, updateProfile);

module.exports = router;
