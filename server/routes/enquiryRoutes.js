const express = require("express");
const router = express.Router();
const { submitEnquiry } = require("../controllers/enquiryController");
const { protect } = require("../middleware/authMiddleware");
const { enquiryValidation } = require("../validators/userValidator");

/**
 * Enquiry Routes
 * ─────────────────────────────────────────
 * POST /api/enquiry — Submit or update enquiry (protected)
 */

router.post("/", protect, enquiryValidation, submitEnquiry);

module.exports = router;
