const express = require("express");
const app = express();
const connectToDb = require("./server");
const product = require("./routes/routes");
const order = require("./routes/routes.order");
connectToDb();
app.use(express.json());
app.use("/product", product);
app.use("/order", order);

app.listen(3000, () => {
  console.log("server connected");
});
