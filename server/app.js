const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const { createGameState, initialGameState } = require('./game/gameState');
const { keydownHandle } = require('./game/keydownHandle');

const PORT = process.env.PORT || 3030;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const gameState = createGameState();

io.on('connection', (socket) => {
  socket.emit('initialGameState', initialGameState);

  socket.on('keydown', (key) => {
    keydownHandle(key, gameState);
    socket.emit('gameState', gameState);
  });
});

server.listen(PORT, console.log('Server running on Port ', PORT));
