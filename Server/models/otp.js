const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
    valid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

otpSchema.methods.setInvalidAfterTimeout = function () {
  const timeout = 5 * 60 * 1000;
  setTimeout(() => {
    this.valid = false;
    this.modifiedTime = new Date();
    this.save();
  }, timeout);
};

// Create the model from the schema
const OTPModel = mongoose.model("OTP", otpSchema);

module.exports = OTPModel;
