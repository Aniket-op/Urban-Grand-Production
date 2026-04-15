const { body } = require("express-validator");

/**
 * Validation rules for user registration.
 */
const registerValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters"),

  body("emailAddress")
    .trim()
    .notEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("contactNumber")
    .trim()
    .notEmpty()
    .withMessage("Contact number is required")
    .isLength({ min: 10 })
    .withMessage("Contact number must be at least 10 digits"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("companyName")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Company name cannot exceed 200 characters"),
];

/**
 * Validation rules for user login.
 */
const loginValidation = [
  body("emailAddress")
    .trim()
    .notEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

/**
 * Validation rules for enquiry submission.
 */
const enquiryValidation = [
  body("enquiry")
    .trim()
    .notEmpty()
    .withMessage("Enquiry details are required")
    .isLength({ max: 2000 })
    .withMessage("Enquiry cannot exceed 2000 characters"),
];

/**
 * Validation rules for profile update.
 */
const profileUpdateValidation = [
  body("fullName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters"),

  body("companyName")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Company name cannot exceed 200 characters"),

  body("contactNumber")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("Contact number must be at least 10 digits"),
];

module.exports = {
  registerValidation,
  loginValidation,
  enquiryValidation,
  profileUpdateValidation,
};
