const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { profileUpdateValidation } = require("../validators/userValidator");

/**
 * User / Profile Routes
 * ─────────────────────────────────────────
 * GET  /api/user/profile — Get user profile (protected)
 * PUT  /api/user/profile — Update user profile (protected)
 */

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, profileUpdateValidation, updateUserProfile);

module.exports = router;
