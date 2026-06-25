const { body } = require('express-validator');

const profileValidator = [
  body('fullName')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Full name cannot exceed 100 characters'),

  body('headline')
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage('Headline cannot exceed 150 characters'),

  body('bio')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Bio cannot exceed 1000 characters'),

  body('phone')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('Phone number is too long'),

  body('location').optional().trim(),

  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array of strings'),

  body('experienceYears')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Experience years cannot be negative'),

  body('education').optional().isArray().withMessage('Education must be an array'),

  body('links.linkedin').optional().trim().isURL().withMessage('LinkedIn must be a valid URL'),

  body('links.github').optional().trim().isURL().withMessage('GitHub must be a valid URL'),

  body('links.portfolio').optional().trim().isURL().withMessage('Portfolio must be a valid URL'),

  body('resumeUrl').optional().trim().isURL().withMessage('Resume URL must be a valid URL'),
];

module.exports = { profileValidator };
