const express = require("express");
const mongoose = require("mongoose");
const OTPModel = require("../models/otp");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config(); // Load environment variables

// ✅ Configure Nodemailer with SendGrid (FAST & Reliable)
const transporter = nodemailer.createTransport({
  service: "gmail", // Gmail SMTP service
  auth: {
    user: "upstridesofficial@gmail.com", // Gmail email address
    pass: process.env.EMAIL_PASSWORD, // Your Gmail password (use app-specific password if 2FA is enabled)
  },
  pool: false, // Disabling pooling (important for serverless environments)
  maxConnections: 1, // Limit to a single connection (to avoid serverless issues)
  maxMessages: 1, // Send only one message per connection
});

// ✅ Helper Function: Generate and save OTP
const generateAndSaveOTP = async (email) => {
  const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP

  let otpData = await OTPModel.findOne({ email });

  if (otpData) {
    otpData.otp = otp;
    otpData.valid = true;
    await otpData.save();
  } else {
    otpData = new OTPModel({ email, otp, valid: true });
    await otpData.save();
  }

  return otpData;
};

// ✅ Route: Fetch OTP
router.get("/fetch/:email", async (req, res) => {
  try {
    const otpData = await OTPModel.findOne({ email: req.params.email });

    if (!otpData) return res.status(404).json({ message: "OTP not found" });

    return res.status(200).json(otpData);
  } catch (error) {
    console.error("Error fetching OTP:", error);
    return res.status(500).json({ message: "Error fetching OTP data" });
  }
});

// ✅ Route: Add or Replace OTP (Sends Email)
router.post("/add", async (req, res) => {
  const { email } = req.body;

  try {
    const otpData = await generateAndSaveOTP(email);

    const mailOptions = {
      from: "UpStrides <upstridesofficial@gmail.com>", // ✅ Professional sender email
      to: email,
      subject: "Your OTP for Login",
      text: `Your OTP for login is: ${otpData.otp}`,
      html: `<p>Your OTP for login is: <strong>${otpData.otp}</strong></p>`,
    };

    // ✅ Ensure email is sent before responding
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "OTP sent successfully!",
      otp: otpData.otp, // Send OTP for testing (REMOVE IN PROD)
    });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return res.status(500).json({ message: "Error sending OTP email" });
  }
});

// ✅ Route: Expire OTP
router.post("/expire/:email", async (req, res) => {
  try {
    const otpData = await OTPModel.findOne({ email: req.params.email });

    if (!otpData) return res.status(404).json({ message: "OTP not found" });

    otpData.valid = false;
    await otpData.save();

    return res.status(200).json({ message: "OTP expired successfully" });
  } catch (error) {
    console.error("Error expiring OTP:", error);
    return res.status(500).json({ message: "Error expiring OTP" });
  }
});

module.exports = router;
