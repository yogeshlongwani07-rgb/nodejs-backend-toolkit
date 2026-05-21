const mongoose = require("mongoose");

function ConnectToDb() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/test")
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("DB connection error:", err));
}

module.exports = { ConnectToDb };
