const mongoose = require("mongoose");

// Define the address schema
const addressSchema = new mongoose.Schema(
  {
    default: { type: Boolean, default: false },
    country: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    apartment: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: false, default: null },
    lastName: { type: String, required: false, default: null },
    address: { type: [addressSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("UserDetails", userSchema);

module.exports = User;
