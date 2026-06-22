const express = require("express");
const router = express.Router();
const {
  createMovieListing,
} = require("../controllers/Movie-listing-controller");

router.post("/add", createMovieListing);

module.exports = router;
