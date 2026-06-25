const Profile = require('../models/Profile');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Create a profile for the authenticated user
 * @route   POST /api/profile
 * @access  Private
 */
const createProfile = asyncHandler(async (req, res) => {
  const existingProfile = await Profile.findOne({ user: req.user._id });

  if (existingProfile) {
    res.status(400);
    throw new Error('Profile already exists for this user. Use update instead.');
  }

  const profile = await Profile.create({
    user: req.user._id,
    ...req.body,
  });

  res.status(201).json({
    success: true,
    message: 'Profile created successfully',
    data: { profile },
  });
});

/**
 * @desc    Get the authenticated user's profile
 * @route   GET /api/profile
 * @access  Private
 */
const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id }).populate(
    'user',
    'name email'
  );

  if (!profile) {
    res.status(404);
    throw new Error('Profile not found. Please create one first.');
  }

  res.status(200).json({
    success: true,
    data: { profile },
  });
});

/**
 * @desc    Update the authenticated user's profile
 * @route   PUT /api/profile
 * @access  Private
 */
const updateProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne({ user: req.user._id });

  if (!profile) {
    // Upsert behavior: create the profile if it doesn't exist yet
    profile = await Profile.create({ user: req.user._id, ...req.body });
    return res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: { profile },
    });
  }

  Object.assign(profile, req.body);
  await profile.save();

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: { profile },
  });
});

module.exports = { createProfile, getProfile, updateProfile };
