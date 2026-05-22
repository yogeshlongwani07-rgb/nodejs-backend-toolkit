const jwt = require("jsonwebtoken");
const secret = "MysecretKey";
function checkAuth(req, res, next) {
  const token = req?.cookies?.token;
  if (!token) {
    return res.redirect("/login");
  }
  try {
    const decode = jwt.verify(token, secret);
    req.user = decode;
    next();
  } catch (err) {
    next(err);
  }
}

function checkAdmin(req, res, next) {
  if (req.user.role === "admin") {
    return next();
  }
  return res.send("Access Denied");
}

module.exports = { checkAdmin, checkAuth };
