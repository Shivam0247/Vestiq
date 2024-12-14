const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
const app = express();

const corsConfig = {
  origin: "*",
  credentials: true, // Corrected the spelling of 'credentials'
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.options("*", cors(corsConfig)); // Allowing preflight requests globally

const port = 4000;

app.use(cors(corsConfig)); // Enable CORS for all routes
app.use(express.json());

// Import the routes
app.use("/api/auth", require("./routes/User"));

// Add the default route last so it doesn't conflict with other routes
app.use("/", (req, res) => {
  res.send("Server is running.");
});

// Set up server and listen on the port
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Connect to MongoDB
connectToMongo()
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
