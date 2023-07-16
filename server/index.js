// Dependencies
import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import cors from "cors";
import sockets from "./socket/sockets.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./api/routes.js";

// Load environment variables from .env file
dotenv.config(); 

// Set strictQuery to false to address the deprecation warning
mongoose.set("strictQuery", false); 

// Connect to MongoDB
async function startServer() {
  await mongoose.connect(process.env.DB_CONNECTION_URI, {
    useNewUrlParser: true,
  });

//Require models for users, rooms, and messages
require('./models/User')
require('./models/Room')
require('./models/Message')


  const app = express();
  const PORT = process.env.PORT || 5001;

  const httpServer = http.createServer(app);
  const socketIOServer = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "my-custom-header"],
      credentials: true,
    },
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Routes
  app.use(require('./routes/NewUser'));
  app.use(cors());
  app.use("/", router);

  socketIOServer.on("connection", sockets);

  httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
