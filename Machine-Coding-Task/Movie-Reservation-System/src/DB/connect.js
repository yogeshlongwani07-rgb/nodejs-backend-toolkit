const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/cinema");
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

module.exports = connectToDb;
