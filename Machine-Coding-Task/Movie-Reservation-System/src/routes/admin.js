const express = require("express");
const router = express.Router();
const { Admin } = require("../models/admin");
const validator = require("validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

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

    if (password.length < 6)
      return res.status(400).json({
        message: "Password length should be more than 6",
        success: false,
      });
    const saltRounds = Number(process.env.SALT_ROUNDS);

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newAdmin = await Admin.create({
      name,
      password: hashPassword,
      email,
      role,
    });
    const SECRET = process.env.SECRET_JWT;
    const token = jwt.sign(
      { role: newAdmin.role, email: newAdmin.email, _id: newAdmin._id },
      SECRET,
      { expiresIn: "7h" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res
      .status(201)
      .json({ message: "Account Created", success: true, token: token });
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({
      message: "Unexpected Error",
      success: false,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Missing required field", success: false });

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res
        .status(400)
        .json({ message: "Admin not found", success: false });
    const validatePassword = await bcrypt.compare(password, admin.password);
    if (!validatePassword)
      return res
        .status(400)
        .json({ message: "Invalid Credentials", success: false });

    const SECRET = process.env.SECRET_JWT;
    const token = jwt.sign(
      { _id: admin._id, role: "admin", email: admin.email },
      SECRET,
      {
        expiresIn: "7h",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ message: "Your are Login!", success: true, token: token });
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({
      message: "Unexpected Error",
      success: false,
    });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({
    success: true,
    message: "Logged out",
  });
});

module.exports = router;
