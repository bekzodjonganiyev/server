const express = require("express")
const app = express()

const http = require("http")
const server = http.createServer(app)

const router = require('./router');
app.use(router);

const cors = require("cors")
app.use(cors())

const { Server } = require("socket.io")
const io = new Server(server, {
    cors: {
        origin: "https://effulgent-gumption-144c6a.netlify.app",
        methods: ["GET", "POST"],
        allowedHeaders: {"Access-Control-Allow-Origin":"*"},
        credentials: true
    }
})

// const io = require("socket.io")(httpServer, {
//     cors: {
//       origin: "https://example.com",
//       methods: ["GET", "POST"],
//       allowedHeaders: ["Access-Control-Allow-Origin"],
//       credentials: true
//     }
//   });

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