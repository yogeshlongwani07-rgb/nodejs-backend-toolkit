const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/place")
    .then(() => {
      console.log("db connected");
    })
    .catch(() => {
      console.log("something went wrong with db");
    });
}

module.exports = connectToDb;
