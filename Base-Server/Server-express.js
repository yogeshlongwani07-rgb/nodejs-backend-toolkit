const express = require("express");

const app = express();

app.use(express.json());

// GET /
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Home Page",
  });
});

// PUT /about
app.put("/about", (req, res) => {
  res.json({
    message: "About page updated",
  });
});

// PATCH /profile
app.patch("/profile", (req, res) => {
  res.json({
    message: "Profile updated partially",
  });
});

// 404 route
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
