const mongoose = require("mongoose");
const order = require("../models/Order");
const product = require("../models/product");

async function createOrder(req, res) {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const { items, deliveryAddress } = req.body;

    //inventory check
    for (const item of items) {
      const prod = await product.findById(item.productId).session(session);
      if (!prod) {
        throw new Error(`product not found ${item.productId}`);
      }
      if (item.qty > prod.stock) {
        throw new Error("Insufficent Stock");
      }
    }

    //reverse Inventory
    for (const item of items) {
      await product.updateOne(
        { _id: item.productId },
        { $inc: { stock: -item.qty } },
        { session },
      );
    }

    const estimatedDeliveryTime = new Date(Date.now() + 20 * 60 * 1000);
    const ord = await order.create(
      [
        {
          items,
          deliveryAddress,
          estimatedDeliveryTime,
        },
      ],
      { session },
    );

    (await session).commitTransaction();
    res.status(201).json({ message: "Done" });
  } catch (err) {
    (await session).abortTransaction();
    console.log(err);
    throw new Error("Something went wrong");
  } finally {
    (await session).endSession();
  }
}

module.exports = createOrder;
