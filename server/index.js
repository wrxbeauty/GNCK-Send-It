// Setting up our dependencies.

const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const app = express();
require("dotenv").config();
const userRoute = require('./routes/userRoute');
const messageRoute = require('./routes/messageRoute')
const socket = require('socket.io')

// This code sets our server to listen on port 5001.

const PORT = process.env.PORT || 5001

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.DB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connected to MongoDB");
})
    .catch((err) => {
        console.log(err.message)
    });

app.use("/api/users", userRoute)
app.use("/api/messages", messageRoute);

const server = app.listen(process.env.PORT, () => {
    console.log("Server is running like Usain Bolt!")
})

// The following code setups the sockets for the messages to go back and forth in real time.


// This code sets up the socket server, then uses CORS to set the host and uses the credentials for a handshake.

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

// Map is used to help store users and make them accessible during app usage.

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-message", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("message-recieve", data.message);
        }
    });
});
