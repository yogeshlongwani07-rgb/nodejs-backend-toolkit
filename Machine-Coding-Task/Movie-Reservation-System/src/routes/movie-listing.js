const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth");
const { isAdmin } = require("../middleware/admin-perform-auth");
const {
  createMovieListing,
  allMovies,
  updateMovieListing,
  deleteMovieListing,
  checkAvailableShows,
} = require("../controllers/Movie-listing-controller");

//Movies CRUD
router.get("/", allMovies);
router.post("/add", isLoggedIn, isAdmin, createMovieListing);
router.put("/edit/:id", isLoggedIn, isAdmin, updateMovieListing);
router.delete("/delete/:id", isLoggedIn, isAdmin, deleteMovieListing);

//Movies Details
router.get("/shows", checkAvailableShows);

module.exports = router;
