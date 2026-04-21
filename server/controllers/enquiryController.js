const { validationResult } = require("express-validator");
const User = require("../models/User");

/**
 * @desc    Submit or update an enquiry
 * @route   POST /api/enquiry
 * @access  Public
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

  const { enquiry, emailAddress, fullName, contactNumber, companyName } = req.body;

  try {
    // If not logged in, we check if email exists.
    let user;
    if (emailAddress) {
      user = await User.findOne({ emailAddress });
    } else if (req.user) {
      user = await User.findById(req.user._id);
    }

    if (user) {
      // Update existing user
      user.enquiry = enquiry;
      
      // Update other details if provided
      if (fullName) user.fullName = fullName;
      if (contactNumber) user.contactNumber = contactNumber;
      if (companyName) user.companyName = companyName;
      
      await user.save();
    } else {
      // Create a guest user (requires dummy password since schema forces it)
      if (!emailAddress || !fullName || !contactNumber) {
        return res.status(400).json({
          success: false,
          message: "Email, Full Name, and Contact Number are required for new enquiries",
        });
      }
      user = await User.create({
        fullName,
        emailAddress,
        contactNumber,
        companyName: companyName || "",
        enquiry,
        password: "GuestPassword123!", // dummy password for guest users
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

/**
 * @desc    Get all enquiries (admin only)
 * @route   GET /api/enquiry
 * @access  Private/Admin
 */
const getAllEnquiries = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    const query = { enquiry: { $exists: true, $ne: "" } };
    
    const count = await User.countDocuments(query);
    
    // Find users who have an enquiry that is not empty
    const usersWithEnquiries = await User.find(query)
      .select("-password")
      .sort({ updatedAt: -1 })
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: usersWithEnquiries.length,
      total: count,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(count / limit)
      },
      enquiries: usersWithEnquiries,
    });
  } catch (error) {
    console.error("Fetch enquiries error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching enquiries",
    });
  }
};

/**
 * @desc    Delete an enquiry (clears the enquiry field for the user)
 * @route   DELETE /api/enquiry/:id
 * @access  Private/Admin
 */
const deleteEnquiry = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Enquiry/User not found"
      });
    }

    user.enquiry = "";
    await user.save();

    res.status(200).json({
      success: true,
      message: "Enquiry removed successfully"
    });
  } catch (error) {
    console.error("Delete enquiry error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting enquiry",
    });
  }
};

module.exports = { submitEnquiry, getAllEnquiries, deleteEnquiry };
