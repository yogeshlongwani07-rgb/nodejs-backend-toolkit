const Movie = require("../models/movie-listing");
const { Admin } = require("../models/user-admin");

async function createMovieListing(req, res) {
  try {
    const listing = await Movie.create({
      ...req.body,
      createdBy: req.user._id,
    });
    await Admin.findByIdAndUpdate(req.user._id, {
      $push: { movies: listing._id },
    });
    res.status(201).json({ message: "Movie added", success: true });
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ message: "Unexpected Error", success: false });
  }
}

async function allMovies(req, res) {
  try {
    const movie = await Movie.find({});
    res.status(200).send(movie);
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ message: "Unexpected Error", success: false });
  }
}

async function updateMovieListing(req, res) {
  try {
    const id = req.params.id;
    const movie = await Movie.findByIdAndUpdate(id, req.body, {
      runValidators: true,
    });
    if (!movie)
      return res
        .status(404)
        .json({ message: "Movie not Found", success: false });

    if (movie.createdBy.toString() !== req.user._id)
      return res
        .status(403)
        .json({ message: "You are not authorized", success: false });

    res.json({ message: "Movie Updated", success: true });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ message: "Unexpected Error" });
    success: false;
  }
}

async function deleteMovieListing(req, res) {
  try {
    const id = req.params.id;
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie)
      return res
        .status(404)
        .json({ message: "Movie not Found", success: false });

    if (movie.createdBy.toString() !== req.user._id)
      return res
        .status(403)
        .json({ message: "You are not authorized", success: false });

    res.json({ message: "Movie Deleted", success: true });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ message: "Unexpected Error", success: false });
  }
}

async function checkAvailableShows(req, res) {
  try {
    const { date } = req.query;
    const shows = await Movie.aggregate([
      { $unwind: "$shows" },
      { $match: { "shows.date": date, "shows.availableSeats": { $gt: 0 } } },
      {
        $project: {
          title: 1,
          duration: 1,
          price: 1,
          rating: 1,
          shows: "$shows",
        },
      },
      { $sort: { "shows.showTime": 1 } },
    ]);
    res.status(200).send(shows);
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ message: "Unexpected Error", success: false });
  }
}

module.exports = {
  createMovieListing,
  updateMovieListing,
  deleteMovieListing,
  allMovies,
  checkAvailableShows,
};
