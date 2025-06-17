const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

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


router.post('/verifyAccessToken', async (req, res) => {
  try {
      console.log('calling:');

    const { accessToken } = req.body;

    const url = 'https://control.msg91.com/api/v5/widget/verifyAccessToken';

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body = {
      authkey: '456348AhVX6Kos684fea51P1', // Replace with your actual authkey
      'access-token': accessToken, // coming from frontend
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Error verifying access token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
