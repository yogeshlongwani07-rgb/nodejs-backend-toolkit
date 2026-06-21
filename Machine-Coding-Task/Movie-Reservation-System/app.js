const express = require("express");
const app = express();
const port = 3000;
const connectToDb = require("./src/DB/connect");
const adminRoutes = require("./src/routes/admin");
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
connectToDb();
app.use(express.json());
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "All Set" });
});

app.listen(port, () => {
  console.log("Server Running");
});
