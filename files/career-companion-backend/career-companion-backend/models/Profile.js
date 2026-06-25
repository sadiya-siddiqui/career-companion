const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // one profile per user
    },
    fullName: {
      type: String,
      trim: true,
      maxlength: [100, 'Full name cannot exceed 100 characters'],
    },
    headline: {
      type: String,
      trim: true,
      maxlength: [150, 'Headline cannot exceed 150 characters'],
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [1000, 'Bio cannot exceed 1000 characters'],
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    experienceYears: {
      type: Number,
      min: [0, 'Experience years cannot be negative'],
      default: 0,
    },
    education: [
      {
        institution: { type: String, trim: true },
        degree: { type: String, trim: true },
        fieldOfStudy: { type: String, trim: true },
        startYear: { type: Number },
        endYear: { type: Number },
      },
    ],
    links: {
      linkedin: { type: String, trim: true },
      github: { type: String, trim: true },
      portfolio: { type: String, trim: true },
    },
    resumeUrl: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
