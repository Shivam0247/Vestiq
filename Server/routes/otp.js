const express = require("express");
const mongoose = require("mongoose");
const OTPModel = require("../models/otp");
const crypto = require("crypto"); // For generating a random OTP
const router = express.Router();
const nodemailer = require("nodemailer"); // Import Nodemailer

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "upstridesofficial@gmail.com",
    pass: "tfot folx kzby nhvg",
  },
});

router.get("/fetch/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const otpData = await OTPModel.findOne({ email });

    if (!otpData) {
      return res.status(404).json({ message: "OTP not found for this email" });
    }

    return res.status(200).json(otpData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching OTP data" });
  }
});

router.post("/add", async (req, res) => {
  const { email } = req.body;

  try {
    // Generate a random OTP (6 digits)
    const otp = crypto.randomInt(100000, 999999).toString();

    let otpData = await OTPModel.findOne({ email });

    if (otpData) {
      // If OTP already exists, replace it
      otpData.otp = otp;
      otpData.valid = true;
      await otpData.save();
    } else {
      // If OTP doesn't exist, create a new entry
      otpData = new OTPModel({
        email,
        otp,
        valid: true,
      });
      await otpData.save();
    }

    // Prepare email content
    const mailOptions = {
      from: "upstridesofficial@gmail.com",
      to: email,
      subject: "Your OTP for login",
      text: `Your OTP for login is: ${otp}`,
    };

    // Send OTP email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return res.status(500).json({ message: "Error sending OTP email" });
      }
      console.log("Email sent:", info.response);
    });

    // Respond with success
    return res.status(200).json({
      message: "OTP created or replaced successfully, and email sent.",
      otp: otpData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating or updating OTP" });
  }
});

router.post("/expire/:email", async (req, res) => {
  const { email } = req.params;

  try {
    // Find the OTP entry for the given email
    let otpData = await OTPModel.findOne({ email });

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
    console.error(error);
    return res.status(500).json({ message: "Error expiring OTP" });
  }
});

module.exports = router;
