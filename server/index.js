// Dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());


// Set strictQuery to false to address the deprecation warning
mongoose.set("strictQuery", false); 

// Connect to MongoDB
async function startServer() {
  await mongoose.connect(process.env.DB_CONNECTION_URI, {
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


  socketIOServer.on("connection", sockets);

  httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
