const mongoose = require("mongoose");

async function connectToMongoDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/testv2");
}

module.exports = connectToMongoDB;
