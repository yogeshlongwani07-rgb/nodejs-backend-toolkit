const express = require("express");
const homerouter = require("./router");

const app = express();

app.use(express.json());
app.use("/", (req, res, next) => {
  console.log(res);
  next();
});

app.use("/", homerouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
