const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const { v4: uuidv4 } = require('uuid');

const Database = require("@replit/database")
const db = new Database()


app.use(express.static('public'))

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

const sessions = {}

io.on('connection', (socket) => {
  socket.on('session_create', data => {
    const sessionId = uuidv4()
    console.log({sessionId})
    socket.emit('session_id', sessionId)
    sessions[sessionId] = socket
    
    // db.set(sessionId, socket)
  })

  socket.on('scan', data => {
    console.log({data})
    sessions[data].emit('scanned')
    // db.get(data).then(value => {
    //   sessions[sessionId].emit('scanned')
    //   console.log({value})
    // })
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
