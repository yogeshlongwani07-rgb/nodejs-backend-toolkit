const express = require("express");
const app = express();
const port = 3000;
const connectToDb = require("./src/DB/connect");
const adminRoutes = require("./src/routes/admin");
const cookieParser = require("cookie-parser");
const movieListingRoutes = require("./src/routes/movie-listing");
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
connectToDb();
app.use(cookieParser());
app.use(express.json());
app.use("/admin", adminRoutes);
app.use("/movie", movieListingRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "All Set" });
});

app.listen(port, () => {
  console.log("Server Running");
});
