const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDb = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/saasproject"
    );
    console.log("DB is connected");
  } catch (error) {
    console.error("Error connecting DB:", error);
    process.exit(1);
  }
};

module.exports = connectDb;
