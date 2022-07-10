const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const cors = require("cors");
app.use(cors());

app.get('/', (req, res) => {
  res.write(`<h1>Socket server is running</h1> `)
  res.end()
})

const PORT = process.env.PORT || 5000;

const { Server } = require("socket.io");
const io = new Server(
  server,
  {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  }
);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(PORT,
  () => console.log(`Server has started on port ${PORT}`));