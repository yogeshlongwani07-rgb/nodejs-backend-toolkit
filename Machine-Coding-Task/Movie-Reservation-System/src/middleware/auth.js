var jwt = require("jsonwebtoken");

function isLoggedIn(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(400)
        .json({ message: "Please log in first", success: false });
    const SECRET_JWT = process.env.SECRET_JWT;
    const decode = jwt.verify(token, SECRET_JWT);
    req.user = decode;
    next();
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ message: "Unexpected Error", success: false });
  }
}

module.exports = { isLoggedIn };
