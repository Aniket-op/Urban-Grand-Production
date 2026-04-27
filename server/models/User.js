const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * User Schema
 * ─────────────────────────────────────────
 * Stores user registration and auth data only.
 * Enquiries are stored in a separate Enquiry
 * collection (one user → many enquiries).
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Never return password by default in queries
    },
    profilePassword: {
      type: String,
      minlength: [6, "Profile Password must be at least 6 characters"],
      select: false, // Never return profile password by default in queries
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
  // If password is modified, hash it
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // If profilePassword is not set yet, default it to the original unhashed password
  // (We handle this before the profilePassword hash block below)
  // Wait, if we are modifying the password, we should NOT overwrite the profile password if it exists.
  // Actually, if we just created the user, this.isNew is true.
  if (this.isNew && !this.profilePassword) {
    this.profilePassword = this.password; // At this point this.password is ALREADY hashed because of the block above!
    // Wait, if it's already hashed, we can just assign the hash!
  } else if (this.isModified("profilePassword")) {
    const salt = await bcrypt.genSalt(12);
    this.profilePassword = await bcrypt.hash(this.profilePassword, salt);
  }

  next();
});

/**
 * Instance method — compare entered password with stored hash.
 * Used during login verification.
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Instance method — compare entered profile password with stored hash.
 * Used during sensitive admin CRUD operations.
 */
userSchema.methods.matchProfilePassword = async function (enteredPassword) {
  // If profile password is not set for some reason, fallback to checking against normal password
  const targetPassword = this.profilePassword || this.password;
  if (!targetPassword) return false;
  return await bcrypt.compare(enteredPassword, targetPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
