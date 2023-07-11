// DEPENDENCIES
const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const cors = require("cors")

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT || 3005
const app = express()
const server = http.createServer(app)

// ROUTES
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
