const express = require('express')
const http = require('http')
const socket = require('socket.io')

const app = express()
const PORT = 3000
const server = http.createServer(app)
const io = new socket.Server(server)

server.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
})

app.use(express.static('public'))

io.on('connection', (socket) => {
    console.log("New user connected")
    socket.on('message', (msg) => {
        io.emit('message', msg)
    })
    socket.on('disconnect', () => console.log("User disconnected"))
})