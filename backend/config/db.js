const mongoose = require("mongoose");
const colors = require("colors");

// Function to establish a connection with MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the provided URI
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });

    // Display a success message when connected
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    // Display an error message if connection fails
    console.log(`Error: ${error.message}`.red.bold);
    process.exit(); // Exit the Node.js process upon error
  }
};

module.exports = connectDB; // Export the connectDB function for use in other modules
