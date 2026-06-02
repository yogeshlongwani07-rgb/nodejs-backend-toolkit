const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
});

const product = mongoose.model("product", productSchema);

module.exports = product;
