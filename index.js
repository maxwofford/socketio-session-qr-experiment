const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const { v4: uuidv4 } = require('uuid');

const Database = require("@replit/database")
const db = new Database()


app.use(express.static('public'))

const sessions = {}

io.on('connection', (socket) => {
  socket.on('session_create', data => {
    const sessionId = uuidv4()
    console.log({sessionId})
    socket.emit('session_id', sessionId)
    sessions[sessionId] = socket
    
  })

  socket.on('scan', sessionId => {
    sessions[sessionId].emit('scanned')
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
