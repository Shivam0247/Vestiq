const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  ProductName: {
    type: String,
    required: true,
    trim: true,
  },
  Price: {
    type: Number,
    required: true,
    min: 0,
  },
  Description: {
    type: String,
    required: true,
    trim: true,
  },
  New: {
    type: Boolean,
    default: false,
  },
  Images: {
    type: [String], // Array of image URLs
    validate: {
      validator: (arr) => arr.every((url) => typeof url === "string"),
      message: "Each image must be a string (URL).",
    },
  },
  Colors: {
    type: [String],
    validate: {
      validator: (arr) => arr.every((color) => typeof color === "string"),
      message: "Each color must be a string.",
    },
  },
  Categories: {
    type: [String],
    validate: {
      validator: (arr) => arr.every((category) => typeof category === "string"),
      message: "Each category must be a string.",
    },
  },
  ProductCategory: {
    type: String,
    enum: ["New Arrivals", "BestSellers", "Offer"],
    required: true,
  },
  Visible: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
