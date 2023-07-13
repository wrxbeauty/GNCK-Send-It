import TypingController from "./controllers/TypingController.js";
import RoomController from "./controllers/RoomController.js";

const sockets = (socket) => {
  const typingController = new TypingController(socket);
  const roomController = new RoomController(socket);

  socket.on("message-from-client", ({ message, roomId }) => {
    let skt = socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    console.log(roomId);
    skt.emit("message", { message });
  });

  

  socket.on("typing-started", typingController.typingStarted)
  socket.on("typing-stopped", typingController.typingStopped)
   

  socket.on("join-room", roomController.joinRoom);

  socket.on("disconnect", () => {
    console.log("User left!");
  });
};

export default sockets;
