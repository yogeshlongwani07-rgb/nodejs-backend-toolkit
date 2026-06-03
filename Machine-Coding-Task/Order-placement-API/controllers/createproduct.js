const product = require("../model/product");
async function createProduct(req, res) {
  const { name, price, stock } = req.body;

  if (!name || !price || !stock) {
    res.status(403).json({ message: "required fields are missing" });
  }
  const result = await product.create({
    name: name,
    price: price,
    stock: stock,
  });
  res.status(201).json({ message: "Product Created" });
}

module.exports = createProduct;
