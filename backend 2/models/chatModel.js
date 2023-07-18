// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the chatModel schema using mongoose.Schema()
const chatModel = mongoose.Schema(
  {
    // Defining a field called chatName of type String with trimming enabled
    chatName: { type: String, trim: true },

    // Defining a field called isGroupChat of type Boolean with a default value of false
    isGroupChat: { type: Boolean, default: false },

    // Defining a field called users as an array of ObjectIds referencing the "User" model
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // Defining a field called latestMessage as an ObjectId referencing the "Message" model
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    // Defining a field called groupAdmin as an ObjectId referencing the "User" model
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  // Adding timestamps to the schema, which automatically adds createdAt and updatedAt fields
  { timestamps: true }
);

// Creating a mongoose model named "Chat" using the chatModel schema
const Chat = mongoose.model("Chat", chatModel);

// Exporting the Chat model to make it available for other parts of the codebase
module.exports = Chat;
