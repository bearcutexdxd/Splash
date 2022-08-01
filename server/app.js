/* eslint-disable no-param-reassign */
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const socketIo = require('socket.io');
const FileStore = require('session-file-store')(session);
const http = require('http');
const { initialGameState, globalGameState, socketRooms } = require('./game/gameState');
const { keydownHandle } = require('./game/keydownHandle');
require('dotenv').config();

const authRouter = require('./src/routes/auth.router');
const statisicsRouter = require('./src/routes/statistics.Router');
const { makeid } = require('./game/utils');

const PORT = process.env.PORT || 3030;

const sessionConfig = {
  name: 'user',
  secret: process.env.COOKIE_SECRET ?? 'summer',
  store: new FileStore(),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
    // sameSite: 'secure',
  },
};

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

  socket.on('joinRoom', (roomId, user) => {
    const socketId = String(socket.id);
    const socketUser = user;
    const currRoomSockets = [];

    socketRooms.forEach((el) => {
      const elRoom = Object.values(el);
      if ((elRoom[0] === roomId)) {
        currRoomSockets.push({
          [socketId]: roomId,
          name: socketUser.name,
          userId: socketUser.id,
        });
      }
    });
    console.log(currRoomSockets, '\n ^ curr room users');

    const socketsNumber = currRoomSockets.length;
    if (socketsNumber > 3) {
      socket.emit('tooManyPlayers');
      return;
    }

    socketRooms.push({ [socketId]: roomId, name: socketUser.name, userId: socketUser.id });
    socket.join(roomId);
    console.log(socketRooms, '\n ^ users and rooms');
    socket.number = socketsNumber + 1;
    socket.to(roomId).emit('socketRooms', socketRooms);
    console.log('>>>>>> socet rooms pull');
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

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig));

app.use('/auth', authRouter);
app.use('/statistics', statisicsRouter);

server.listen(PORT, console.log('Server running on Port ', PORT));
