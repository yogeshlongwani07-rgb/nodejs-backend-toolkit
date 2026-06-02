const express = require("express");
const app = express();
const connectToDb = require("./Model/connect");
const URL = require("./Model/Schema");
const urlRoutes = require("./Controller/url");
app.use(express.json());
app.use("/", urlRoutes);

connectToDb();

app.listen(3000, () => {
  console.log("Port on 3000");
});
