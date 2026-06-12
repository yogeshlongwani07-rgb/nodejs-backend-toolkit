const express = require("express");
const app = express();
const router = express.Router();

router.get("/about", (req, res) => {
  res.json({
    message: "About page updated",
  });
});

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Home Page",
  });
});

router.get("/profile", (req, res) => {
  console.log(req.query.q);
  res.json({
    message: "Profile updated partially",
  });
});

module.exports = router;
