function isUser(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
  if (req.user.role !== "user")
    return res.status(403).json({
      message: "Only user can book Movies",
      success: false,
    });

  next();
}

module.exports = { isUser };
