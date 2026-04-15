const express = require("express");
const router = express.Router();
const { register, login, getProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { authLimiter } = require("../middleware/rateLimiter");
const {
  registerValidation,
  loginValidation,
} = require("../validators/userValidator");

/**
 * Auth Routes
 * ─────────────────────────────────────────
 * POST /api/auth/register  — Create a new user account
 * POST /api/auth/login     — Login and receive JWT
 * GET  /api/auth/profile   — Get current user (protected)
 */

// Public routes (with stricter rate limiting)
router.post("/register", authLimiter, registerValidation, register);
router.post("/login", authLimiter, loginValidation, login);

// Protected route
router.get("/profile", protect, getProfile);

module.exports = router;
