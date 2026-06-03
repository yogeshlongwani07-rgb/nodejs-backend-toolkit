const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      qty: {
        type: Number,
        required: true,
      },
    },
  ],
  deliveryAddress: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED"],
  },
  estimatedDeliveryTime: Date,
});

const order = mongoose.model("order", orderSchema);
module.exports = order;
