const express = require("express");
const app = express();
let ejs = require("ejs");
const { ConnectToDb } = require("./Models/DB");
const bcrypt = require("bcrypt");
const userModel = require("./Models/Schema");
const auth = require("./Routes/Routes");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded());
app.set("view engine", "ejs");
app.set("views", "./views");

ConnectToDb();

app.use("/", auth);

app.use((err, req, res, next) => {
  console.log(err);
});
app.listen(3000, () => {
  console.log("Server Started");
});
