const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: "Hindi",
    },
    duration: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    shows: [
      {
        showTime: {
          type: String,
          required: true,
        },
        date: {
          type: String, // "2026-06-25"
          required: true,
        },
        totalSeats: {
          type: Number,
          required: true,
        },
        availableSeats: {
          type: Number,
          required: true,
        },
        screen: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true },
);

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
