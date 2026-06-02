const mongoose = require("mongoose");

function connectToDb() {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/url-shortner").then(() => {
      console.log("DB connected");
    });
  } catch (err) {
    console.log("error", err);
  }
}

module.exports = connectToDb;
