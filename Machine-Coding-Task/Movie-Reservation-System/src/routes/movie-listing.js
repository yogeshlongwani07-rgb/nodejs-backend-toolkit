const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth");
const {
  createMovieListing,
} = require("../controllers/Movie-listing-controller");

router.post("/add", isLoggedIn, createMovieListing);

module.exports = router;
