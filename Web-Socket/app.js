const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const path = require("path");
const { Server } = require("socket.io");

app.use(express.static(path.resolve("./public")));
const io = new Server()

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(3000);
