const { validationResult } = require("express-validator");
const Enquiry = require("../models/Enquiry");
const User = require("../models/User");

/**
 * @desc    Submit a new enquiry (one user can submit many)
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

  const {
    enquiry,
    emailAddress,
    fullName,
    contactNumber,
    companyName,
    productName,
    category,
    subcategory,
  } = req.body;

  // Basic required-field check for guest submissions
  if (!emailAddress || !fullName || !contactNumber) {
    return res.status(400).json({
      success: false,
      message: "Email, Full Name, and Contact Number are required",
    });
  }

  try {
    // If a registered user is logged in, resolve their userId
    let userId = null;
    if (req.user) {
      userId = req.user._id;
    } else if (emailAddress) {
      const existingUser = await User.findOne({ emailAddress });
      if (existingUser) userId = existingUser._id;
    }

    // Always create a new Enquiry document — no overwriting
    const newEnquiry = await Enquiry.create({
      fullName,
      emailAddress,
      contactNumber,
      companyName: companyName || "",
      enquiry,
      productName: productName || "",
      category: category || "",
      subcategory: subcategory || "",
      userId,
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      enquiry: {
        _id: newEnquiry._id,
        fullName: newEnquiry.fullName,
        companyName: newEnquiry.companyName,
        emailAddress: newEnquiry.emailAddress,
        contactNumber: newEnquiry.contactNumber,
        enquiry: newEnquiry.enquiry,
        productName: newEnquiry.productName,
        category: newEnquiry.category,
        subcategory: newEnquiry.subcategory,
        createdAt: newEnquiry.createdAt,
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
 * @desc    Get all enquiries (admin only) — newest first, paginated
 * @route   GET /api/enquiry
 * @access  Private/Admin
 */
const getAllEnquiries = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    const count = await Enquiry.countDocuments();

    const enquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: enquiries.length,
      total: count,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
      enquiries,
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
 * @desc    Delete an enquiry by its ID
 * @route   DELETE /api/enquiry/:id
 * @access  Private/Admin
 */
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
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
