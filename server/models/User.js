const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * User Schema
 * ─────────────────────────────────────────
 * Stores user registration data, profile info,
 * and their latest enquiry text.
 */
const userSchema = new mongoose.Schema(
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
      unique: true,
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
      default: "",
      maxlength: [2000, "Enquiry cannot exceed 2000 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Never return password by default in queries
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt automatically
  }
);

/**
 * Pre-save hook — hash password before saving to DB.
 * Only hashes if the password field was modified (not on profile updates).
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Instance method — compare entered password with stored hash.
 * Used during login verification.
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
