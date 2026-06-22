const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth");
const { isAdmin } = require("../middleware/admin-perform-auth");
const {
  createMovieListing,
} = require("../controllers/Movie-listing-controller");

router.post("/add", isLoggedIn, isAdmin, createMovieListing);

module.exports = router;
