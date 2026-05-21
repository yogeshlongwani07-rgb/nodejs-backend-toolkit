const express = require("express");
const app = express();
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../Models/Schema");

function checkAuth(req, res, next) {
  const token = req?.cookies?.token;
  if (!token) {
    res.redirect("/login");
  }
  const decode = jwt.verify(token, "Hello");
  req.user = decode;

  next();
}

Router.get("/profile", checkAuth, (req, res) => {
  res.send("You are at Profile Section");
});

Router.get("/signup", (req, res) => {
  res.render("signup");
});

Router.get("/login", (req, res) => {
  res.render("login");
});

Router.post("/signup", async (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.redirect("/signup");
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const token = jwt.sign(
      { username: username, email: email, password: hash },
      "Hello",
      { expiresIn: "7d" },
    );

    await userModel.create({
      username: username,
      email: email,
      password: hash,
    });
    res.cookie("token", token);
    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
});

Router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.redirect("/login");
  }
  try {
    const user = await userModel.findOne({ email: email });
    const passcheck = await bcrypt.compare(password, user.password);
    if (passcheck) {
      const token = jwt.sign(
        { username: user.username, email: user.email, password: user.password },
        "Hello",
        { expiresIn: "7d" },
      );
      res.cookie("token", token);
      res.redirect("/profile");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = Router;
