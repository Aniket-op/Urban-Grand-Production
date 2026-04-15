const { validationResult } = require("express-validator");
const User = require("../models/User");

/**
 * @desc    Submit or update an enquiry for the logged-in user
 * @route   POST /api/enquiry
 * @access  Private (requires JWT)
 */
const submitEnquiry = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }

  const { enquiry } = req.body;

  try {
    // Update the enquiry field inside the user's document
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { enquiry },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry submitted successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        companyName: user.companyName,
        emailAddress: user.emailAddress,
        contactNumber: user.contactNumber,
        enquiry: user.enquiry,
      },
    });
  } catch (error) {
    console.error("Enquiry submission error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting enquiry",
    });
  }
};

module.exports = { submitEnquiry };
