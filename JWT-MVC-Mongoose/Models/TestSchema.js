const mongoose = require("mongoose");

const porductSchema = new mongoose.Schema(
  {
    id: String,
    ProductName: String,
    sku: String,
    category: {
      type: String,
      enum: ["snacks", "beverages", "dairy"],
    },
    price: Number,
    stock: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const product = mongoose.model("product", porductSchema);

product.createIndexes({ sku: 1 });

const user = new mongoose.Schema(
  {
    name: String,
    userid: String,
    products: [
      {
        id: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  { timestamps: true },
);

user.createIndexes({ userid: 1 });
const user = mongoose.model("user", user);
