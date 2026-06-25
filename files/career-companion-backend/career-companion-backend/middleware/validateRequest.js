const { validationResult } = require('express-validator');

/**
 * Runs after express-validator rule chains. If any validation errors are
 * present, responds with 422 and a structured list of errors. Otherwise
 * passes control to the next middleware/controller.
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }

  next();
};

module.exports = validateRequest;
