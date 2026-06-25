const mongoose = require('mongoose');

const JOB_STATUSES = ['Applied', 'Interview', 'Offer', 'Selected', 'Rejected', 'Withdrawn'];

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [150, 'Company name cannot exceed 150 characters'],
    },
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: [150, 'Job title cannot exceed 150 characters'],
    },
    jobUrl: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: JOB_STATUSES,
        message: `Status must be one of: ${JOB_STATUSES.join(', ')}`,
      },
      default: 'Applied',
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    salary: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Notes cannot exceed 2000 characters'],
    },
  },
  { timestamps: true }
);

jobSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Job', jobSchema);
module.exports.JOB_STATUSES = JOB_STATUSES;
