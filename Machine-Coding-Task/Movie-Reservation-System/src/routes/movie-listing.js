const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth");
const { isAdmin } = require("../middleware/admin-perform-auth");
const {
  createMovieListing,
  updateMovieListing,
} = require("../controllers/Movie-listing-controller");

router.post("/add", isLoggedIn, isAdmin, createMovieListing);
router.put("/edit/:id", isLoggedIn, isAdmin, updateMovieListing);

module.exports = router;
