export default class RoomController {
    socket;
    
    constructor(socket) {
        this.socket = socket;
    }

    joinRoom = ({ roomId }) => {
        console.log("Joining room");
        this.socket.join(roomId)
    }
}