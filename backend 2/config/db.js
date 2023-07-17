const mongoose = require("mongoose");
const colors = require("colors");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the provided URI
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Display a success message upon successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    // Display an error message if there's a connection error
    console.log(`Error: ${error.message}`.red.bold);
    process.exit(); // Exit the process if there's an error
  }
};

module.exports = connectDB; // Export the connectDB function to be used in other files
