/**
 * Wraps an async route handler so that any rejected promise / thrown error
 * is forwarded to Express's error-handling middleware via next().
 * Avoids repetitive try/catch blocks in every controller function.
 *
 * @param {Function} fn - async (req, res, next) => {}
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
