import nodemailer from "nodemailer";
import mongoose from "mongoose";
import OTPModel from "../models/otp"; // Adjust path if needed
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    // Connect to MongoDB (Only connect if not already connected)
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      });
    }

    // Generate and save OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    await OTPModel.findOneAndUpdate(
      { email },
      { otp, valid: true },
      { upsert: true }
    );

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "upstridesofficial@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: "upstridesofficial@gmail.com",
      to: email,
      subject: "Your OTP for login",
      text: `Your OTP for login is: ${otp}`,
    });

    return res.status(200).json({ message: "OTP sent successfully!", otp });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error sending OTP" });
  }
}
