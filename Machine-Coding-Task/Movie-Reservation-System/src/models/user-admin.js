const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    bookings: [
      {
        movie: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movie",
          required: true,
        },
        status: {
          type: String,
          enum: ["Failed", "Confirmed", "Cancelled"],
          default: "Confirmed",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
module.exports = { User, Admin };
