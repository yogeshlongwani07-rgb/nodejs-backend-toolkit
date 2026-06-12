const express = require("express");
const app = express();
const urlRoutes = require("./routes/url");
const connectToMongoDB = require("./connect");
connectToMongoDB();

app.use(express.json());
app.use("/", urlRoutes);

app.listen(3000);
