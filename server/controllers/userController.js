const { validationResult } = require("express-validator");
const User = require("../models/User");

/**
 * @desc    Get logged-in user's profile
 * @route   GET /api/user/profile
 * @access  Private (requires JWT)
 */
const getUserProfile = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        fullName: user.fullName,
        companyName: user.companyName,
        emailAddress: user.emailAddress,
        contactNumber: user.contactNumber,
        enquiry: user.enquiry,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
    });
  }
};

/**
 * @desc    Update logged-in user's profile (fullName, companyName, contactNumber)
 * @route   PUT /api/user/profile
 * @access  Private (requires JWT)
 */
const updateUserProfile = async (req, res) => {
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

  const { fullName, companyName, contactNumber } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update only the fields that were provided
    if (fullName !== undefined) user.fullName = fullName;
    if (companyName !== undefined) user.companyName = companyName;
    if (contactNumber !== undefined) user.contactNumber = contactNumber;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        companyName: user.companyName,
        emailAddress: user.emailAddress,
        contactNumber: user.contactNumber,
        enquiry: user.enquiry,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating profile",
    });
  }
};

module.exports = { getUserProfile, updateUserProfile };
