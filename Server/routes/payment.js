const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_qJMenRdRHXHatJ",
  key_secret: "RHkp7YYtENcgPsTOBgMBGVxg",
});

router.post("/orders", async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount * 100,
    currency: currency || "INR",
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({
      order_id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.get("/payment/:paymentId", async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await razorpay.payments.fetch(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json({
      payment_id: payment.id,
      status: payment.status,
      method: payment.method,
      amount: payment.amount / 100,
      currency: payment.currency,
      created_at: new Date(payment.created_at * 1000).toLocaleString(),
    });
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ message: "Failed to fetch payment details", error });
  }
});

module.exports = router;

module.exports = router;
