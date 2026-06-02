const express = require("express");
const app = express();
const orders = require("./routes/order.routes");

app.use(express.json());
app.use("/api", orders);

module.exports = app;
