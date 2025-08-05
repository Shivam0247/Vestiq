const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    const mongoURI = process.env.MONGOURI;
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToMongo;
