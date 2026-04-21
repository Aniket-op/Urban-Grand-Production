const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  updateUserAdmin,
  deleteUserAdmin
} = require("../controllers/userController");
const { protect, adminProtect } = require("../middleware/authMiddleware");
const { profileUpdateValidation } = require("../validators/userValidator");

/**
 * User / Profile Routes
 * ─────────────────────────────────────────
 * GET    /api/user/profile — Get user profile (protected)
 * PUT    /api/user/profile — Update user profile (protected)
 * GET    /api/user/all     — Get all users (admin only)
 * PUT    /api/user/:id     — Update a user (admin only)
 * DELETE /api/user/:id     — Delete a user (admin only)
 */

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, profileUpdateValidation, updateUserProfile);

router.get("/all", protect, adminProtect, getAllUsers);
router.put("/:id", protect, adminProtect, updateUserAdmin);
router.delete("/:id", protect, adminProtect, deleteUserAdmin);

module.exports = router;
