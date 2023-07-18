// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the messageSchema schema using mongoose.Schema()
const messageSchema = mongoose.Schema(
  {
    // Defining a field called sender as an ObjectId referencing the "User" model
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // Defining a field called content of type String with trimming enabled
    content: { type: String, trim: true },

    // Defining a field called chat as an ObjectId referencing the "Chat" model
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },

    // Defining a field called readBy as an array of ObjectIds referencing the "User" model
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  // Adding timestamps to the schema, which automatically adds createdAt and updatedAt fields
  { timestamps: true }
);

// Creating a mongoose model named "Message" using the messageSchema schema
const Message = mongoose.model("Message", messageSchema);

// Exporting the Message model to make it available for other parts of the codebase
module.exports = Message;
