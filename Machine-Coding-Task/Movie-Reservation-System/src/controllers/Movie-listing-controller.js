const Movie = require("../models/movie-listing");

async function createMovieListing(req, res) {
  try {
    const listing = await Movie.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json({ message: "Movie added", success: true });
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ message: "Unexpected Error", success: false });
  }
}

module.exports = { createMovieListing };
