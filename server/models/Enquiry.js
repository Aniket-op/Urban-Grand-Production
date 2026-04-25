const mongoose = require("mongoose");

/**
 * Enquiry Schema
 * ─────────────────────────────────────────
 * Each document is ONE enquiry submission.
 * A single user (identified by emailAddress) can
 * have unlimited enquiries — each is its own record.
 *
 * userId is optional: populated only when a registered
 * user is logged in and submits the form.
 */
const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },
    companyName: {
      type: String,
      trim: true,
      default: "",
    },
    emailAddress: {
      type: String,
      required: [true, "Email address is required"],
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    enquiry: {
      type: String,
      required: [true, "Enquiry details are required"],
      maxlength: [2000, "Enquiry cannot exceed 2000 characters"],
    },
    productName: {
      type: String,
      default: "",
      trim: true,
      maxlength: [300, "Product name cannot exceed 300 characters"],
    },
    category: {
      type: String,
      default: "",
      trim: true,
      maxlength: [100, "Category cannot exceed 100 characters"],
    },
    subcategory: {
      type: String,
      default: "",
      trim: true,
      maxlength: [100, "Subcategory cannot exceed 100 characters"],
    },
    /** Reference to a registered User — null for guest enquiries */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

module.exports = Enquiry;
