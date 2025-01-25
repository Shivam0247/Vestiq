const express = require("express");
const mongoose = require("mongoose");
const OTPModel = require("../models/otp");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const router = express.Router();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // Load .env file
}

// Configure Nodemailer with connection pooling
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "upstridesofficial@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
  pool: true, // Enable connection pooling
  maxConnections: 5, // Maximum number of connections
  maxMessages: 10, // Maximum number of messages per connection
});

// Helper Function: Generate and save OTP
const generateAndSaveOTP = async (email) => {
  const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP

  // Check if OTP data already exists
  let otpData = await OTPModel.findOne({ email });

  if (otpData) {
    otpData.otp = otp;
    otpData.valid = true;
    await otpData.save();
  } else {
    otpData = new OTPModel({
      email,
      otp,
      valid: true,
    });
    await otpData.save();
  }

  return otpData;
};

// Route: Fetch OTP
router.get("/fetch/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const otpData = await OTPModel.findOne({ email });

    if (!otpData) {
      return res.status(404).json({ message: "OTP not found for this email" });
    }

    return res.status(200).json(otpData);
  } catch (error) {
    console.error("Error fetching OTP:", error);
    return res.status(500).json({ message: "Error fetching OTP data" });
  }
});

// Route: Add or Replace OTP
router.post("/add", async (req, res) => {
  const { email } = req.body;

  try {
    const otpData = await generateAndSaveOTP(email); // Generate and save OTP

    // Prepare email content
    const mailOptions = {
      from: "upstridesofficial@gmail.com",
      to: email,
      subject: "Your OTP for login",
      text: `Your OTP for login is: ${otpData.otp}`,
    };

    // Send OTP email asynchronously
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .json({ message: "Error sending OTP email", error });
      }
      console.log("Email sent:", info.response);
    });

    // Respond with success
    return res.status(200).json({
      message: "OTP created or replaced successfully, and email sent.",
      otp: otpData,
    });
  } catch (error) {
    console.error("Error creating or updating OTP:", error);
    return res.status(500).json({ message: "Error creating or updating OTP" });
  }
});

// Route: Expire OTP
router.post("/expire/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const otpData = await OTPModel.findOne({ email });

    if (!otpData) {
      return res.status(404).json({ message: "OTP not found for this email" });
    }

    otpData.valid = false;
    await otpData.save();

    return res.status(200).json({
      message: "OTP expired successfully",
      otp: otpData,
    });
  } catch (error) {
    console.error("Error expiring OTP:", error);
    return res.status(500).json({ message: "Error expiring OTP" });
  }
});

module.exports = router;
