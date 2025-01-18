const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
const app = express();

const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsConfig));
app.use(express.json());

// Import the routes
app.use("/api/auth", require("./routes/User"));
app.use("/api/Product", require("./routes/Products"));

// Add the default route last so it doesn't conflict with other routes
app.use("/", (req, res) => {
  res.send("Server is running.");
});
app.listen(4000, console.log("sever started on port 4000"));

// Connect to MongoDB
connectToMongo()
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Export your Express app as a handler for Vercel
module.exports = app;
