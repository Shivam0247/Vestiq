const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    const mongoURI =
      "mongodb+srv://shivampatel3650:Shivam.mongo.%40%40@rmscluster.rp33wwc.mongodb.net/vestiq?retryWrites=true&w=majority&appName=RMSCluster";
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToMongo;
