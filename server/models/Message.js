const mongoose = require('mongoose')



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
        type: mongoose.Schema.Types.ObjectID,
        required: true,
    }
})



module.exports = mongoose.model("message", messageSchema);