const express = require('express');
const session = require('express-session');
const cors = require('cors');
const socketIo = require('socket.io');
const FileStore = require('session-file-store')(session);
const http = require('http');
const { createGameState, initialGameState } = require('./game/gameState');
const { keydownHandle } = require('./game/keydownHandle');
require('dotenv').config();

const authRouter = require('./src/routes/auth.router');
const statisicsRouter = require('./src/routes/statistics.Router');

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

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig));

app.use('/auth', authRouter);
app.use('/statistics', statisicsRouter);

server.listen(PORT, console.log('Server running on Port ', PORT));
