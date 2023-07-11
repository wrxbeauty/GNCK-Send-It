// DEPENDENCIES
const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const cors = require("cors")

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// ROUTES
app.get('/', (req, res) => {
  res.send('SendIt app response')
})

// LISTEN
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})
