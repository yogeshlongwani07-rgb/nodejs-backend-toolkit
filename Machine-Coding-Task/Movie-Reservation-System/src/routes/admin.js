const express = require("express");
const router = express.Router();

const { registerAdmin, loginAdmin } = require("../controllers/admin-account");

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({
    success: true,
    message: "Logged out",
  });
});

module.exports = router;
