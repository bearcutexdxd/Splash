/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const socketIo = require('socket.io');
const FileStore = require('session-file-store')(session);
const http = require('http');
const {
  initialGameState, globalGameState, socketRooms, findRoomGameState,
} = require('./game/gameState');
const { keydownHandle } = require('./game/keydownHandle');
const { makeid } = require('./game/utils');
const { keyupHandle } = require('./game/keyupHandle');
require('dotenv').config();
const authRouter = require('./src/routes/auth.router');
const statisicsRouter = require('./src/routes/statistics.Router');
const skinRouter = require('./src/routes/skin.router');

// check functions

const { checkMovement } = require('./game/check/checkMovement');
const { resetCountersStop } = require('./game/logic/animation/resetCountersStop');
const { movement } = require('./game/logic/movement');
const { setSplash } = require('./game/logic/generateSplash');
const { checkIsPlayerHit } = require('./game/check/checkIsPlayerHit');
const { resetCountersOverflow } = require('./game/logic/animation/resetCountersOverflow');
const { setAnimation } = require('./game/logic/animation/setAnimation');
const { checkSplash } = require('./game/check/checkSplash');

let intervalCounter = 0;

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
// app.use(cors());
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
    intervalCounter += 1;

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

    // variables
    let currGameState = findRoomGameState(roomId);
    let animation = {
      counter1: 0, counter2: 0, counter3: 0, counter4: 0,
    };
    let lastGameState = {};
    const fps = 60;
    const animationFrame = 120;

    socket.on('keydown', (key, roomId2, playerId) => {
      currGameState = keydownHandle(key, currGameState, playerId);
    });

    socket.on('keyup', (key, roomId2, playerId) => {
      currGameState = keyupHandle(key, currGameState, playerId);
    });

    if (intervalCounter === 1) {
      setInterval(() => {
        lastGameState = JSON.parse(JSON.stringify(currGameState));

        // movement logic
        currGameState = movement(currGameState);

        // animation logic
        currGameState = resetCountersStop(currGameState, animation).currGameState;
        animation = resetCountersStop(currGameState, animation).animation;
        animation = resetCountersOverflow(animation, animationFrame);
        currGameState = setAnimation(currGameState, animation, animationFrame).currGameState;
        animation = setAnimation(currGameState, animation, animationFrame).animation;

        // splash generation
        currGameState = setSplash(currGameState, socket.number);

        // splash check
        currGameState = checkSplash(currGameState);

        if (JSON.stringify(lastGameState) !== JSON.stringify(currGameState)) {
          io.sockets.in(roomId).emit('gameState', currGameState);
        }
      }, 1000 / fps);
    }
  });
});

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig));

app.use('/auth', authRouter);
app.use('/statistics', statisicsRouter);
app.use('/shop', skinRouter);

server.listen(PORT, console.log('Server running on Port ', PORT));
