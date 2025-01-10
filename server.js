// server.js
const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static('public'));

io.on('connection', socket => {
    socket.on('join', room => {
        socket.join(room);
        socket.to(room).emit('userConnected');
    });

    socket.on('offer', (offer, room) => {
        socket.to(room).emit('offer', offer);
    });

    socket.on('answer', (answer, room) => {
        socket.to(room).emit('answer', answer);
    });

    socket.on('candidate', (candidate, room) => {
        socket.to(room).emit('candidate', candidate);
    });

    socket.on('endCall', room => {
        socket.to(room).emit('callEnded');
    });
});

server.listen(3000);
