const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

const app = express();

const corsConfig = {
  origin: ["https://upstrides.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/User"));
app.use("/api/Product", require("./routes/Products"));
app.use("/api/OTP", require("./routes/otp"));
app.use("/api/userDetails", require("./routes/UserDetails"));
app.use("/api/order", require("./routes/order"));
app.use("/api/payments", require("./routes/payment"));

// Health check
app.get("/", (req, res) => {
  res.send("Server is running.");
});

connectToMongo()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error(err);
  });


module.exports = app;
