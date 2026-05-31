const express = require("express");
const { connectToDb, post } = require("./server");
connectToDb();

const app = express();
app.get("/posts", async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 5;
    const skip = (page - 1) * limit;
    const result = await post.find({}).skip(skip).limit(limit);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(3000, console.log("on port 3000"));
