const order = require("../model/order");

async function placeOrder(req, res) {
  const { items, deliveryAddress } = req.body;

  const estimatedDeliveryTime = new Date(Date.now() + 20 * 60 * 1000);

  const result = await order.create({
    items: items,
    deliveryAddress: deliveryAddress,
    status: "PLACED",
    estimatedDeliveryTime: estimatedDeliveryTime,
  });

  res.status(201).json({ message: "Order Placed" });
}

module.exports = placeOrder;
