const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectID,
        required: "Chat room is required",
        ref: "Room",
    },

    user: {
        type: mongoose.Schema.Types.ObjectID,
        required: "Chat room is required",
        ref: "User",
    },

    message: {
        text: { type: String, required: true },
      },
      
})



module.exports = mongoose.model("Message", messageSchema);