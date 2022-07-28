/* eslint-disable no-param-reassign */
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const { initialGameState, globalGameState, socketRooms } = require('./game/gameState');
const { keydownHandle } = require('./game/keydownHandle');
const { makeid } = require('./game/utils');

const PORT = process.env.PORT || 3030;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://admin.socket.io'],
  },
});

io.on('connection', (socket) => {
  socket.on('createRoom', () => {
    const roomId = makeid();
    socket.emit('getRoomName', roomId);

    globalGameState[roomId] = initialGameState();
    console.log(globalGameState, '\n ^ all game states');
  });

  socket.on('joinRoom', (roomId) => {
    const socketId = String(socket.id);
    const currRoomSockets = [];

    socketRooms.forEach((el) => {
      const elRoom = Object.values(el);
      if ((elRoom[0] === roomId)) currRoomSockets.push({ [socketId]: roomId });
    });
    console.log(currRoomSockets, '\n ^ curr room users');

    const socketsNumber = currRoomSockets.length;
    if (socketsNumber > 3) {
      socket.emit('tooManyPlayers');
      return;
    }

    socketRooms.push({ [socketId]: roomId });
    socket.join(roomId);
    console.log(socketRooms, '\n ^ users and rooms');
    socket.number = socketsNumber + 1;
    console.log(socket.number);
    socket.emit('playerId', socket.number);

    if (socketsNumber === 1) { // starting game, (players number === 4)
      io.sockets.in(roomId).emit('startGame', roomId);
    }
  });

  socket.on('keydown', (key, roomId, playerId) => {
    let currGameState;

    Object.keys(globalGameState).forEach((el) => {
      if (el === roomId) {
        currGameState = globalGameState[el];
      }
    });

    currGameState = keydownHandle(key, currGameState, playerId);
    globalGameState[roomId] = currGameState;
    io.sockets.in(roomId).emit('gameState', currGameState);
  });
});

server.listen(PORT, console.log('Server running on Port ', PORT));
