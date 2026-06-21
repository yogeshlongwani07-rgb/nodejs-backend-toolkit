const express = require("express");
const router = express.Router();
const { Admin } = require("../models/admin");
const validator = require("validator");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {});

router.post("/register", async (req, res) => {
  try {
    const { name, password, email, role } = req.body;
    if (!role)
      return res.status(403).json({
        success: false,
        message: "Unauthorized. Only administrators can create admin accounts.",
      });

    if (!name || !password || !email)
      return res
        .status(400)
        .json({ message: "Missing required field", success: false });

    if (!validator.isEmail(email))
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });

    const duplicateEmail = await Admin.findOne({ email });

    if (duplicateEmail)
      return res
        .status(409)
        .json({ message: "Email already exist", success: false });
    const saltRounds = Number(process.env.SALT_ROUNDS);

    const hashPassword = await bcrypt.hash(password, saltRounds);

    await Admin.create({
      name,
      password: hashPassword,
      email,
      role,
    });
    res.status(201).json({ message: "Account Created", success: true });
  } catch (err) {
    console.log("error", err);
  }
});

module.exports = router;
