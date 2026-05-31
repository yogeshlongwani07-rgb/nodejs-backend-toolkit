const mongoose = require("mongoose");
function connectToDb() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/media")
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

const postSchema = new mongoose.Schema(
  {
    avatar: String,
    email: String,
    userName: String,
  },
  { timeStamp: true },
);

const post = mongoose.model("post", postSchema);

module.exports = { connectToDb, post };
