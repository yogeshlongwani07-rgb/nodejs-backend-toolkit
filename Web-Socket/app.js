const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const path = require("path");
const { Server } = require("socket.io");

app.use(express.static(path.resolve("./public")));
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    socket.emit("message", msg);
  });
});

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(3000);
