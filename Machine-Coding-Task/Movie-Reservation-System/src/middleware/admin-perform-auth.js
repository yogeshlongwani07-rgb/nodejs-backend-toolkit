function isAdmin(req, res, next) {
  if (req.user.role !== "admin")
    return res
      .status(403)
      .json({ message: "Only admin can add movie listings", success: false });

  next();
}

module.exports = { isAdmin };
