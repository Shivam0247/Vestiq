const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/UserDisplay", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

router.post("/UserAdd", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      password,
      address,
      city,
      country,
      zipPostalCode,
    } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword, // Save the hashed password
      address,
      city,
      country,
      zipPostalCode,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: "Error adding user", error });
  }
});

router.post("/Login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Return user data excluding sensitive information
    const { password: _, ...userData } = user.toObject();
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
