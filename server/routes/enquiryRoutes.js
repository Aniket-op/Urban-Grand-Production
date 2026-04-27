const express = require("express");
const router = express.Router();
const { submitEnquiry, getAllEnquiries, deleteEnquiry } = require("../controllers/enquiryController");
const { protect, adminProtect } = require("../middleware/authMiddleware");
const { requireProfilePassword } = require("../middleware/profileAuthMiddleware");
const { enquiryValidation } = require("../validators/userValidator");

/**
 * Enquiry Routes
 * ─────────────────────────────────────────
 * POST   /api/enquiry     — Submit or update enquiry (public)
 * GET    /api/enquiry     — Get all enquiries (admin only)
 * DELETE /api/enquiry/:id — Delete an enquiry (admin only)
 */

router.post("/", enquiryValidation, submitEnquiry);
router.get("/", protect, adminProtect, getAllEnquiries);
router.delete("/:id", protect, adminProtect, requireProfilePassword, deleteEnquiry);

module.exports = router;
