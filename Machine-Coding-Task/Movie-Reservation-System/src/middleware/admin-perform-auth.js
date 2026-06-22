function isAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
  if (req.user.role !== "admin")
    return res.status(403).json({
      message: "Only admin can add/update/delete movie listings",
      success: false,
    });

  next();
}

module.exports = { isAdmin };
