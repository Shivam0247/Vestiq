const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
const corsConfig = {
  origin: "*",
  Credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
const app = express();
const port = 4000;

app.use(cors(corsConfig));
app.use(express.json());

// Import the routes
app.use("/api/auth", require("./routes/User"));

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
