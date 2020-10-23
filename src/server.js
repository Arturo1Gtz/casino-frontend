const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Run when client connects
io.on('connection', socket => {
    console.log('New connection');

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined');

    //Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left')
    });
})

const PORT = 3001 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
