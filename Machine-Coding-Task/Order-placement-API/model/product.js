const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },

  stock: {
    type: Number,
    required: true,
    min: 0,
  },
});

const product = mongoose.model("product", productSchema);
module.exports = product;
