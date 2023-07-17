const mongoose = require("mongoose");

// Define the chat model schema
const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true }, // Name of the chat
    isGroupChat: { type: Boolean, default: false }, // Indicates if the chat is a group chat
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user IDs participating in the chat
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    }, // ID of the latest message in the chat
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ID of the group chat admin
  },
  { timestamps: true } // Adds timestamps for createdAt and updatedAt fields
);

// Create the Chat model based on the chatModel schema
const Chat = mongoose.model("Chat", chatModel);

// Export the Chat model
module.exports = Chat;
