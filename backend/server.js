const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

dotenv.config(); //Load environment variables
connectDB(); //Connect to the database
const app = express(); // Create an Express application

app.use(express.json()); // Middleware to parse JSON data

// Routes
app.use("/api/user", userRoutes); // User routes
app.use("/api/chat", chatRoutes); // Chat routes
app.use("/api/message", messageRoutes); // Message routes

// -------------------------- Deployment ------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  // Serve static files from the frontend build directory
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  // Serve the index.html file for all other routes
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// -------------------------- Deployment ------------------------------

// Error Handling middlewares
app.use(notFound); // 404 Not Found middleware
app.use(errorHandler); // Custom error handling middleware

const PORT = process.env.PORT; // Set the port from environment variable

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
  // Start the server
);

// Socket.io configuration
const io = require("socket.io")(server, {
  pingTimeout: 60000, // Socket ping timeout
  cors: {
    origin: "http://localhost:3000", // Allowed origin for CORS
    // credentials: true,
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  // Socket.io setup
  socket.on("setup", (userData) => {
    socket.join(userData._id);// Join the room using user's ID
    socket.emit("connected");// Emit a 'connected' event to the client
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    // Send the new message to all users in the chat room
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id); // Leave the room when user is disconnected
  });
});
