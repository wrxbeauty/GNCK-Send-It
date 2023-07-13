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
const userRoutes = require("./routes/NewUser")
const authRoutes = require("./routes")


//MongoDB Connection
mongoose.connect("mongodb://localhost:27017")

//db connection
connection()

//Middleware
app.use(express.json())
app.use(cors())

// API ROUTES
app.get('/', (req, res) => {
  res.send('SendIt app response')
})

// LISTEN
server.listen(PORT, () =>
  console.log(`Server is up and running on port ${PORT}...`)
)
//app.listen(PORT, () => {
 // console.log('listening on port', PORT);
//})
