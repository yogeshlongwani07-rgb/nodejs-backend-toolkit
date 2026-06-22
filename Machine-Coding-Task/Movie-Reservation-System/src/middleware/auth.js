function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(400).json({ message: "Please log in first" });
  
}
