const User = require("../models/User");

/**
 * Require Profile Password Middleware
 * ─────────────────────────────────────────
 * Protects sensitive admin CRUD operations by requiring
 * the admin's profile password.
 * Reads the 'X-Profile-Password' header.
 */
const requireProfilePassword = async (req, res, next) => {
  // We assume protect and adminProtect have already run, so req.user exists
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Not authorized as an admin",
    });
  }

  const profilePassword = req.headers["x-profile-password"];
  
  if (!profilePassword) {
    return res.status(401).json({
      success: false,
      message: "Profile password is required for this operation",
    });
  }

  try {
    // We need to re-fetch the user to get the select:false fields
    const userWithPasswords = await User.findById(req.user._id).select("+profilePassword +password");
    
    if (!userWithPasswords) {
       return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await userWithPasswords.matchProfilePassword(profilePassword);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid profile password",
      });
    }

    // Password matches, proceed
    next();
  } catch (error) {
    console.error("Profile password verification error:", error);
    res.status(500).json({
      success: false,
      message: "Server error verifying profile password",
    });
  }
};

module.exports = { requireProfilePassword };
