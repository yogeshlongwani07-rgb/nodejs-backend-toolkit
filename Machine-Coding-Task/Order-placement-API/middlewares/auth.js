//fake auth

module.exports = (req, res, next) => {
  req.user = {
    id: "123",
  };
  next();
};
