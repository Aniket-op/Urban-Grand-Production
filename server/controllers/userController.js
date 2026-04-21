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

/**
 * @desc    Get all users (Admin only)
 * @route   GET /api/user/all
 * @access  Private/Admin
 */
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    const query = {};
    const count = await User.countDocuments(query);
    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: users.length,
      total: count,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users",
    });
  }
};

/**
 * @desc    Update any user's profile (Admin only)
 * @route   PUT /api/user/:id
 * @access  Private/Admin
 */
const updateUserAdmin = async (req, res) => {
  const { fullName, companyName, contactNumber, emailAddress, isAdmin } = req.body;

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (fullName !== undefined) user.fullName = fullName;
    if (companyName !== undefined) user.companyName = companyName;
    if (contactNumber !== undefined) user.contactNumber = contactNumber;
    if (emailAddress !== undefined) user.emailAddress = emailAddress;
    if (isAdmin !== undefined) user.isAdmin = isAdmin;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        companyName: user.companyName,
        emailAddress: user.emailAddress,
        contactNumber: user.contactNumber,
        enquiry: user.enquiry,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update user admin error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating user",
    });
  }
};

/**
 * @desc    Delete a user (Admin only)
 * @route   DELETE /api/user/:id
 * @access  Private/Admin
 */
const deleteUserAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user admin error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting user",
    });
  }
};

module.exports = { 
  getUserProfile, 
  updateUserProfile,
  getAllUsers,
  updateUserAdmin,
  deleteUserAdmin
};
