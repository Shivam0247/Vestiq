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
  Sizes: {
    type: [String], // Array of available sizes (e.g., ["XS", "S", "M"])
    validate: {
      validator: (arr) => arr.every((size) => typeof size === "string"),
      message: "Each size must be a string.",
    },
  },
  Images: {
    type: [String], // Array of image URLs
    validate: {
      validator: (arr) => arr.every((url) => typeof url === "string"),
      message: "Each image must be a string (URL).",
    },
  },
  Features: {
    type: [String], // Array of product features
    validate: {
      validator: (arr) => arr.every((feature) => typeof feature === "string"),
      message: "Each feature must be a string.",
    },
  },
  CompositionAndCare: {
    type: [String], // Array for composition & care details
    validate: {
      validator: (arr) => arr.every((item) => typeof item === "string"),
      message: "Each composition & care item must be a string.",
    },
  },
  SizeChart: {
    type: [
      {
        size: { type: String, required: true },
        chest: { type: String, required: true }, // Use String for flexibility (e.g., '42"')
        length: { type: String, required: true },
        shoulder: { type: String, required: true },
      },
    ],
    validate: {
      validator: (arr) =>
        arr.every(
          (entry) =>
            typeof entry.size === "string" &&
            typeof entry.chest === "string" &&
            typeof entry.length === "string" &&
            typeof entry.shoulder === "string"
        ),
      message:
        "Each size chart entry must have size, chest, length, and shoulder as strings.",
    },
  },
  InStock: {
    type: Boolean,
    required: true,
    default: true,
  },
  ProductType: {
    type: String, // Type of product (e.g., "Clothing", "Accessories")
    required: true,
    trim: true,
  },
  Status: {
    type: String,
    enum: ["New", "On Sale", "Sold Out", "Coming Soon"],
    default: "New",
  },
  Category: {
    type: [String], // Array of categories
    enum: ["Limited Stock", "LTD_ED", null],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
