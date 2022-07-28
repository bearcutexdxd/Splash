/* eslint-disable no-param-reassign */
const express = require('express');
const socketIo = require('socket.io');
const { instrument } = require('@socket.io/admin-ui');
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

instrument(io, { auth: false });

// const gameState = initialGameState();

io.on('connection', (socket) => {
  // socket.emit('initialGameState', initialGameState);

  // socket.on('keydown', (key) => {
  //   keydownHandle(key, gameState);
  //   socket.emit('gameState', gameState);
  // });

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

    if (socketsNumber === 1) { // starting game, check for 1 player less
      io.sockets.in(roomId).emit('startGame', roomId);

      // let currGameState = globalGameState.find((el) => {
      //   const elKey = Object.keys(el)[0];
      //   if (elKey === roomId) {
      //     return true;
      //   }
      // });
      // currGameState = currGameState[roomId];

      // socket.on('keydown', (key) => {
      //   const newCurrGameState = keydownHandle(key, currGameState);
      //   console.log(newCurrGameState);
      //   io.sockets.in(roomId).emit('gameState', newCurrGameState);
      //   // socket.to(roomId).emit('gameState', newCurrGameState);
      // });
    }
  });

  socket.on('keydown', (key, roomId) => {
    console.log('here');
    // let currGameState = globalGameState.find((el) => {
    //   const elKey = Object.keys(el)[0];
    //   if (elKey === roomId) {
    //     return true;
    //   }
    // });
    // currGameState = currGameState[roomId];

    let currGameState;
    Object.keys(globalGameState).forEach((el) => {
      if (el === roomId) {
        currGameState = globalGameState[el];
      }
    });

    currGameState = keydownHandle(key, currGameState);
    console.log(currGameState, 'currGameState');
    globalGameState[roomId] = currGameState;
    io.sockets.in(roomId).emit('gameState', currGameState);
    // socket.to(roomId).emit('gameState', newCurrGameState);
  });

  // socket.on('startGame', (currGameState, roomId) => {
  //   socket.on('keydown', (key) => {
  //     const newCurrGameState = keydownHandle(key, currGameState);
  //     console.log(newCurrGameState);
  //     io.sockets.in(roomId).emit('gameState', newCurrGameState);
  //     // socket.to(roomId).emit('gameState', newCurrGameState);
  //   });
  // });

  // let roomsUsers = socketRooms.map((el) => Object.values(el)[0]);
  // roomsUsers = roomsUsers.sort((a, b) => a - b);
  // console.log(roomsUsers);
});

server.listen(PORT, console.log('Server running on Port ', PORT));
