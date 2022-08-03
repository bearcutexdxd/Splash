/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const socketIo = require('socket.io');
const FileStore = require('session-file-store')(session);
const http = require('http');
const { Module } = require('module');
const {
  initialGameState, globalGameState, rooms, findRoomGameState,
} = require('./game/gameState');
let { socketRooms } = require('./game/gameState');
const { keydownHandle } = require('./game/keydownHandle');
const { makeid } = require('./game/utils');
const { keyupHandle } = require('./game/keyupHandle');
require('dotenv').config();
const authRouter = require('./src/routes/auth.router');
const statisicsRouter = require('./src/routes/statistics.Router');
// const roomsRouter = require('./src/routes/rooms.router');
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

let currRoom;

const { checkIsPlayerDead } = require('./game/check/checkIsPlayerDead');
const { checkRemoveDeadPlayers } = require('./game/check/checkRemoveDeadPlayers');
const { checkIsRoomEmpty } = require('./game/check/checkIsRoomEmpty');
const { checkWinnerInStarted } = require('./game/check/checkWinnerInStarted');
const { checkStopGame } = require('./game/check/checkStopGame');
const { checkAlivePlayer } = require('./game/check/checkAlivePlayer');
const { checkStopLastPlayer } = require('./game/check/checkStopLastPlayer');

const { changeCoordsStart, changeCoordsFinish } = require('./game/logic/changeCoords');
const { checkSolidBomb } = require('./game/check/checkSolidBomb');
const { resetBombsCounter } = require('./game/logic/reserBombsCounter');
const { deleteWalls } = require('./game/logic/deleteWalls');
const { wallAnimation } = require('./game/logic/animation/wallAnimation');
const { generateBonus } = require('./game/logic/generateBonus');

const intervalCounter = 0;

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
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('getRooms', () => {
    socket.emit('sendRooms', socketRooms);
  });

  socket.on('createRoom', () => {
    const roomId = makeid();
    socket.emit('getRoomName', roomId);
    socket.emit('rooms', roomId);

    globalGameState[roomId] = initialGameState();
    console.log(globalGameState, '\n ^ all game states');

    socket.emit('sendRooms', socketRooms);
  });

  socket.on('joinRoom', (roomId, user) => {
    currRoom = roomId;

    if (globalGameState[roomId]) {
      globalGameState[roomId].intervalCounter += 1;
      if (globalGameState[roomId].intervalCounter > 2) { // change for 4 players
        socket.emit('gameInProgress');
      }
    }
    console.log(globalGameState, '\n ^ all game states');

    const socketId = String(socket.id);
    const socketUser = user;
    const currRoomSockets = [];
    const rooms = {};

    socketRooms.forEach((el) => {
      const elRoom = Object.values(el);
      if ((elRoom[0] === roomId)) {
        currRoomSockets.push({
          [socketId]: roomId,
          name: socketUser.name,
          userId: socketUser.id,
          room: roomId,
        });
      }
    });
    console.log(currRoomSockets, '\n ^ curr room users');

    const socketsNumber = currRoomSockets.length;
    socket.number = socketsNumber + 1;

    socketRooms.push({

      [socketId]: roomId, name: socketUser.name, userId: socketUser.id, room: roomId, playerId: socket.number,
    });
    socket.join(roomId);
    console.log(socketRooms, '\n ^ users and rooms');
    socket.number = socketsNumber + 1;
    socket.emit('socketRooms', socketRooms.filter((el) => el.room === currRoom));
    socket.to(roomId).emit('socketRooms', socketRooms);

    socket.emit('playerId', socket.number);

    socket.emit('sendRooms', socketRooms);

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

    // user leave
    socket.on('disconnect', () => {
      console.log('Socket disconnected!');
      socketRooms = checkIsRoomEmpty(roomId, socket);
      socket.leave(roomId);

      socket.emit('sendRooms', socketRooms);

      // check if 1 user in started games
      const currSocketRooms = socketRooms;
      const winner = checkWinnerInStarted(roomId, currSocketRooms);
      if (winner) io.sockets.in(roomId).emit('win', currGameState, winner);
    });

    // user leave (navigate)
    socket.on('disconnectNavigate', (currentRoom) => {
      console.log('Socket disconnected from navigate!');
      socketRooms = checkIsRoomEmpty(currentRoom, socket);
      socket.leave(roomId);

      socket.emit('sendRooms', socketRooms);

      // check if 1 user in started games
      const currSocketRooms = socketRooms;
      const winner = checkWinnerInStarted(roomId, currSocketRooms);
      if (winner) io.sockets.in(roomId).emit('win', currGameState, winner);
    });

    socket.on('keydown', (key, roomId2, playerId) => {
      currGameState = changeCoordsStart(currGameState);
      currGameState = keydownHandle(key, currGameState, playerId);
      currGameState = changeCoordsFinish(currGameState);
    });

    socket.on('keyup', (key, roomId2, playerId) => {
      currGameState = changeCoordsStart(currGameState);
      currGameState = keyupHandle(key, currGameState, playerId);
      currGameState = changeCoordsFinish(currGameState);
    });

    let interval;

    if (globalGameState[roomId]?.intervalCounter === 1) {
      interval = setInterval(() => {
        currGameState = changeCoordsStart(currGameState);
        lastGameState = JSON.parse(JSON.stringify(currGameState));

        // playerIsDead check
        currGameState = checkIsPlayerDead(currGameState, io, roomId);

        // removeDeadPlayers check
        currGameState = checkRemoveDeadPlayers(currGameState);

        // stopGame check
        if (checkStopGame(currGameState)) {
          // stopping moving
          currGameState = checkStopLastPlayer(currGameState);
          // finding alive winner
          const alivePlayer = checkAlivePlayer(currGameState);
          // sending gameState
          io.sockets.in(roomId).emit('gameEnd', currGameState, alivePlayer);
          clearInterval(interval);
        }

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

        // bomb solid check
        currGameState = checkSolidBomb(currGameState);

        // wall animation
        currGameState = wallAnimation(currGameState);

        // generate bonus
        currGameState = generateBonus(currGameState);

        // delete walls if destroyed
        currGameState = deleteWalls(currGameState);

        currGameState = changeCoordsFinish(currGameState);

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

app.get('/curr/room', (req, res) => {
  const roomUsers = socketRooms.filter((el) => el.room === currRoom);
  console.log('roms!!!!!', currRoom);
  res.json(roomUsers);
});
app.get('/rooms', (req, res) => {
  console.log('roms!!!!!', socketRooms);
  const obj = {};
  socketRooms.forEach((el) => (obj[el.room] ? obj[el.room] += 1 : obj[el.room] = 1));

  res.json(obj);
});

app.use('/auth', authRouter);
app.use('/statistics', statisicsRouter);
app.use('/skins', skinRouter);

server.listen(PORT, console.log('Server running on Port ', PORT));
