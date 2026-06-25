const { body } = require('express-validator');
const { JOB_STATUSES } = require('../../models/Job');

const createJobValidator = [
  body('companyName')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ max: 150 })
    .withMessage('Company name cannot exceed 150 characters'),

  body('jobTitle')
    .trim()
    .notEmpty()
    .withMessage('Job title is required')
    .isLength({ max: 150 })
    .withMessage('Job title cannot exceed 150 characters'),

  body('jobUrl').optional().trim().isURL().withMessage('Job URL must be a valid URL'),

  body('location').optional().trim(),

  body('status')
    .optional()
    .isIn(JOB_STATUSES)
    .withMessage(`Status must be one of: ${JOB_STATUSES.join(', ')}`),

  body('appliedDate')
    .optional()
    .isISO8601()
    .withMessage('Applied date must be a valid date'),

  body('salary').optional().trim(),

  body('notes')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Notes cannot exceed 2000 characters'),
];

const updateJobStatusValidator = [
  body('status')
    .trim()
    .notEmpty()
    .withMessage('Status is required')
    .isIn(JOB_STATUSES)
    .withMessage(`Status must be one of: ${JOB_STATUSES.join(', ')}`),
];

const updateJobValidator = [
  body('companyName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Company name cannot be empty')
    .isLength({ max: 150 })
    .withMessage('Company name cannot exceed 150 characters'),

  body('jobTitle')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Job title cannot be empty')
    .isLength({ max: 150 })
    .withMessage('Job title cannot exceed 150 characters'),

  body('jobUrl').optional().trim().isURL().withMessage('Job URL must be a valid URL'),

  body('location').optional().trim(),

  body('status')
    .optional()
    .isIn(JOB_STATUSES)
    .withMessage(`Status must be one of: ${JOB_STATUSES.join(', ')}`),

  body('appliedDate')
    .optional()
    .isISO8601()
    .withMessage('Applied date must be a valid date'),

  body('salary').optional().trim(),

  body('notes')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Notes cannot exceed 2000 characters'),
];

module.exports = { createJobValidator, updateJobStatusValidator, updateJobValidator };
