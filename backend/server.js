const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// Middleware to parse JSON data in the request body
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Define a route for the root URL "/"
app.get('/', (req, res) => {
    // Send a response with the message "API is Running"
    res.send("API is Running");
});
app.use("/api/user", userRoutes);

app.use(notFound)
app.use(errorHandler)
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);
// // Define a route for the "/api/chat" endpoint
// app.get('/api/chat', (req, res) => {
//     // Send the 'chats' array as the response
//     res.send(chats);
// });

// // Define a route for the "/api/chat/:id" endpoint
// app.get('/api/chat/:id', (req, res) => {
//     // Find the chat with the specified ID in the 'chats' array
//     const singleChat = chats.find((c) => c._id === req.params.id);
    
//     // Send the found chat as the response
//     res.send(singleChat);
// });

// Define the port to listen on, using the value from the environment variable PORT, or fallback to 5001
const PORT = process.env.PORT || 5001;

// Start the server and listen on the specified port
app.listen(PORT, console.log(`Server Started on PORT ${PORT}`));
