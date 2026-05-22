const express = require("express");
const fs = require("fs");
const status = require("express-status-monitor");
const zlib = require("zlib");

const app = express();

app.use(status());

app.get("/file", (req, res) => {
  const stream = fs.createReadStream("./file.txt", "utf-8");
  stream.on("data", (chunk) => {
    res.write(chunk);
  });
  stream.on("end", () => {
    res.end();
  });
});

app.get("/fast-file", (req, res) => {
  const readStream = fs.createReadStream("./file.txt");

  const writeStream = fs.createWriteStream("./file.zip");

  readStream
    .pipe(zlib.createGzip())
    .pipe(writeStream)
    .on("finish", () => {
      res.download("./file.zip");
    });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
