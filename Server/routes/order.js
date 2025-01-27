const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// Route to add a new order
router.post("/add-order", async (req, res) => {
  const {
    email,
    orderNo,
    products,
    shippingAddress,
    billingAddress,
    orderStatus,
    paymentMethod,
    subtotal,
    shippingCost,
    total,
  } = req.body;

  try {
    // Validate required fields
    if (
      !email ||
      !orderNo ||
      !products ||
      !shippingAddress ||
      !billingAddress ||
      !paymentMethod ||
      !subtotal ||
      !shippingCost ||
      !total
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new order
    const newOrder = new Order({
      email,
      orderNo,
      products,
      shippingAddress,
      billingAddress,
      orderStatus: orderStatus || "placed",
      paymentMethod,
      subtotal,
      shippingCost,
      total,
    });

    // Save the order to the database
    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the order", error });
  }
});

// Route to get orders by email
router.get("/get-orders/:email", async (req, res) => {
  const { email } = req.params;

  try {
    // Find orders associated with the provided email
    const orders = await Order.find({ email });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this email" });
    }

    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching orders", error });
  }
});

module.exports = router;
