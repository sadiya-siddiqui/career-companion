const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

/**
 * Protects routes by verifying the JWT sent in the Authorization header.
 * Expected header format: "Authorization: Bearer <token>"
 * On success, attaches the authenticated user document to req.user.
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401);
      throw new Error('Not authorized. User no longer exists.');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    if (error.name === 'TokenExpiredError') {
      throw new Error('Not authorized. Token has expired.');
    }
    throw new Error('Not authorized. Token verification failed.');
  }
});

module.exports = { protect };
