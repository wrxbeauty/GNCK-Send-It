// DEPENDENCIES
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require('dotenv');
const socketio = require('socket.io');
const connection = require('./db')
require('dotenv').config



// CONFIGURATION
const PORT = process.env.PORT || 3005
const app = express()
const server = require('http').Server(app);
const io = socketio(server);
const axios = require('axios')
const userRoutes = require("./routes/NewUser")
const authRoutes = require("./routes/authorize")


//MongoDB Connection
mongoose.connect("MONGODB_URI=mongodb+srv://Send-IT:s4a23hVo2OYQdGPo@cluster0.4enoych.mongodb.net/?retryWrites=true&w=majority")

//db connection
connection()

//Middleware
app.use(express.json())
app.use(cors())

// API ROUTES
// app.get('/', (req, res) => {
//   res.send('SendIt app response')
// })

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes)

// LISTEN

const port = process.env.PORT || 3005
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})
