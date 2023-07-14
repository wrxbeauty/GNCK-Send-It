import express from "express";
import http from "http";
import path from "path";

import { Server } from "socket.io";
import { fileURLToPath } from "url";
import cors from "cors";
import sockets from "./socket/sockets.js";


const app = express();
const PORT = 5001;
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

 io.on("connection", sockets) 

httpServer.listen(PORT, () => {
  console.log("server is running at http://localhost:5001");
});