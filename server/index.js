import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();
const PORT = 5001;

const httpServer = http.createServer(app);
const socketIOServer = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  },
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

socketIOServer.on("connection", (socket) => {
  socket.on("message-from-client", (data) => {
    console.log("Received message from client:", data.message);
    socket.broadcast.emit("message", data); // Emit to all other connected sockets except the sender
  });

  socket.on("typing-started", () => {
    socket.broadcast.emit("typing-started-from-server");
  });

  socket.on("typing-stopped", () => {
    socket.broadcast.emit("typing-stopped-from-server");
  });

  socket.on("disconnect", () => {
    console.log("User left!");
  });
});

httpServer.listen(PORT, () => {
  console.log("server is running at http://localhost:5001");
});
