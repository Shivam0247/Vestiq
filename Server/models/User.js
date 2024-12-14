// Import Mongoose
const mongoose = require("mongoose");

// Define the User Schema
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  zipPostalCode: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to update the modifiedDate before saving
UserSchema.pre("save", function (next) {
  this.modifiedDate = Date.now();
  next();
});

// Export the User model
const User = mongoose.model("User", UserSchema);
module.exports = User;
