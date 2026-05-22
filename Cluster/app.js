const express = require("express");
const cluster = require("node:cluster");
const os = require("os");

if (cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  app.get("/", (req, res) => {
    res.send(`Running ${process.pid}`);
  });

  app.listen(3000);
}
