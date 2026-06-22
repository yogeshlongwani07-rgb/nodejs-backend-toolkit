const express = require("express");
const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
  deleteAdmin,
} = require("../controllers/admin-account");

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

router.delete("/delete/:id", deleteAdmin);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({
    success: true,
    message: "Logged out",
  });
});

module.exports = router;
