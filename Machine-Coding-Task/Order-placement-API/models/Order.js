const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        qty: Number,
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
  },
  { timeStamps: true },
);

const order = mongoose.model("order", orderSchema);
module.exports = order;
