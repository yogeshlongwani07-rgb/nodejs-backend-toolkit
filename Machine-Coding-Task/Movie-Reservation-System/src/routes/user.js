const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  deleteUser,
} = require("../controllers/user-account");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/delete/:id", deleteUser);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({
    success: true,
    message: "Logged out",
  });
});

module.exports = router;
