const express = require("express");
const app = express();
const Router = express.Router();
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const userModel = require("../Models/Schema");
const secret = "MysecretKey";
const { checkAdmin, checkAuth } = require("../Middlewares/Auth");

Router.get("/profile", checkAuth, (req, res) => {
  res.send(`Your are at ${req.user.username} Profile Page`);
});

Router.get("/admin", checkAuth, checkAdmin, (req, res) => {
  res.send("You are at admin page");
});

Router.get("/signup", (req, res) => {
  res.render("signup");
});

Router.get("/login", (req, res) => {
  res.render("login");
});

Router.post("/signup", async (req, res, next) => {
  const { username, password, email, role } = req.body;
  if (!username || !password || !email || !role) {
    return res.redirect("/signup");
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const token = jwt.sign({ username: username, role: role }, secret, {
      expiresIn: "7d",
    });

    await userModel.create({
      username: username,
      email: email,
      role: role,
      password: hash,
    });
    res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
});

Router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.redirect("/login");
  }
  try {
    const user = await userModel.findOne({ email: email });
    const passcheck = await bcrypt.compare(password, user.password);
    if (passcheck) {
      const token = jwt.sign(
        { username: user.username, role: user.role },
        secret,
        {
          expiresIn: "7d",
        },
      );
      res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
      res.redirect("/profile");
    } else {
      return res.redirect("/login");
    }
  } catch (err) {
    next(err);
  }
});

Router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = Router;
