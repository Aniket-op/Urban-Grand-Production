const jwt = require("jsonwebtoken");

/**
 * Generate a signed JWT token containing the user's ID.
 * Token expires based on the JWT_EXPIRE env variable (default: 7 days).
 *
 * @param {string} userId - MongoDB ObjectId of the user
 * @returns {string} Signed JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

module.exports = generateToken;
