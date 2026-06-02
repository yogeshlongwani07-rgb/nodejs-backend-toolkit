const mongoose = require("mongoose");
const app = require("./app");

function connectToDb() {
  mongoose
    .connect("mongodb://localhost:27017/orders")
    .then(() => {
      console.log("connected");
      app.listen(3000, () => {
        console.log("port working");
      });
    })
    .catch(() => {
      console.log("Something wrong with DB");
    });
}
connectToDb();
