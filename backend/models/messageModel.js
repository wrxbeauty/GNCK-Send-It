const mongoose = require("mongoose");

// Define the message schema
const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ID of the user who sent the message
    content: { type: String, trim: true }, // Content of the message
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" }, // ID of the chat the message belongs to
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user IDs who have read the message
  },
  { timestamps: true } // Adds timestamps for createdAt and updatedAt fields
);

// Create the Message model based on the messageSchema
const Message = mongoose.model("Message", messageSchema);

// Export the Message model
module.exports = Message;
