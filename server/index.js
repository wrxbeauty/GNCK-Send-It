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

dotenv.config(); // Load environment variables from .env file

mongoose.set("strictQuery", false); // Set strictQuery to false to address the deprecation warning

async function startServer() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
  });

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
