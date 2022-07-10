'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3001;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

// io.on('connection', (socket) => {
//   console.log('Client connected');
//   socket.on('disconnect', () => console.log('Client disconnected'));
// });

// setInterval(() => io.emit('time', new Date().toTimeString()), 1000);


io.on("connection", (socket) => {
    console.log("User connected", socket.id)

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User with ID ${socket.id} jonied room: ${data}`);
    })

    socket.on("send_message", data => {
        socket.to(data.room).emit("receive_message", data)
    }) 

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)
    })
})

// server.listen(3001, () => {
//     console.log("Server is running")
// })