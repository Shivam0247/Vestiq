const mongoose = require("mongoose");

// Define the Product Schema
const productSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to product ID
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  size: { type: String, required: false },
});

// Define the Address Schema
const addressSchema = new mongoose.Schema({
  country: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  apartment: { type: String, required: false },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: String, required: true },
});

// Define the Order Schema
const orderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    orderNo: { type: String, required: true, unique: true },
    products: [productSchema], // Array of product objects
    shippingAddress: { type: addressSchema, required: true },
    billingAddress: { type: addressSchema, required: true },
    orderStatus: {
      type: String,
      enum: ["placed", "packing", "shipping"],
      default: "packing",
    },
    paymentMethod: { type: String, required: true },
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
