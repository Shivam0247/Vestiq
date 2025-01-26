const express = require("express");
const User = require("../models/UserDetails");
const router = express.Router();

router.post("/add-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user with the provided email
    const newUser = new User({
      email,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User created with email", user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating user", error });
  }
});

router.put("/add-name/:email", async (req, res) => {
  const { email } = req.params;
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res
      .status(400)
      .json({ message: "First name and last name are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's first name and last name
    user.firstName = firstName;
    user.lastName = lastName;

    await user.save();

    return res.status(200).json({ message: "User's name updated", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating name", error });
  }
});

router.put("/add-address/:email", async (req, res) => {
  const { email } = req.params;
  const {
    country,
    firstName,
    lastName,
    address,
    apartment,
    city,
    state,
    pincode,
    phone,
    default: isDefault,
  } = req.body;

  if (
    !country ||
    !firstName ||
    !lastName ||
    !address ||
    !city ||
    !state ||
    !pincode ||
    !phone
  ) {
    return res.status(400).json({ message: "All address fields are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the new address to the user's address array
    const newAddress = {
      country,
      firstName,
      lastName,
      address,
      apartment,
      city,
      state,
      pincode,
      phone,
      default: isDefault || false, // Default is false if not provided
    };

    user.address.push(newAddress);

    await user.save();

    return res
      .status(200)
      .json({ message: "Address added successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding address", error });
  }
});

module.exports = router;
