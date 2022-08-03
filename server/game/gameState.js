/* eslint-disable prefer-const */
/* eslint-disable max-len */
const { v4: uuidv4 } = require('uuid');

const globalGameState = {};

const rooms = {};
let socketRooms = [];

function initialGameState() {
  const wallTimer = 30;
  const speed = 1;
  const bonusesTimer = 600;
  const invulnerabilityTimer = 30;

  return {
    player1: {
      direction: 'down',
      animation: '1',
      movement: {
        down: false, up: false, left: false, right: false,
      },
      pos: {
        x: 0,
        y: 0,
      },
      hp: 1,
      speed,
      isAlive: true,
      maxBombs: 1,
      bombsCounter: 0,
      invulnerability: { active: false, timer: invulnerabilityTimer },
      bonusesTimer: { speed: { active: false, timer: bonusesTimer }, moreBombs: { active: false, timer: bonusesTimer } },
      statistics: {
        kills: 0, deaths: 0, loses: 0, wins: 0, timePlayed: 0,
      },
    },
    player2: {
      direction: 'down',
      animation: '1',
      movement: {
        down: false, up: false, left: false, right: false,
      },
      pos: {
        x: 384,
        y: 0,
      },
      hp: 1,
      speed,
      isAlive: true,
      maxBombs: 1,
      bombsCounter: 0,
      invulnerability: { active: false, timer: invulnerabilityTimer },
      bonusesTimer: { speed: { active: false, timer: bonusesTimer }, moreBombs: { active: false, timer: bonusesTimer } },
      statistics: {
        kills: 0, deaths: 0, loses: 0, wins: 0, timePlayed: 0,
      },
    },
    player3: {
      direction: 'down',
      animation: '1',
      movement: {
        down: false, up: false, left: false, right: false,
      },
      pos: {
        x: 0,
        y: 384,
      },
      hp: 1,
      speed,
      isAlive: true,
      maxBombs: 1,
      bombsCounter: 0,
      invulnerability: { active: false, timer: invulnerabilityTimer },
      bonusesTimer: { speed: { active: false, timer: bonusesTimer }, moreBombs: { active: false, timer: bonusesTimer } },
      statistics: {
        kills: 0, deaths: 0, loses: 0, wins: 0, timePlayed: 0,
      },
    },
    player4: {
      direction: 'down',
      animation: '1',
      movement: {
        down: false, up: false, left: false, right: false,
      },
      pos: {
        x: 384,
        y: 384,
      },
      hp: 1,
      speed,
      isAlive: true,
      maxBombs: 1,
      bombsCounter: 0,
      invulnerability: { active: false, timer: invulnerabilityTimer },
      bonusesTimer: { speed: { active: false, timer: bonusesTimer }, moreBombs: { active: false, timer: bonusesTimer } },
      statistics: {
        kills: 0, deaths: 0, loses: 0, wins: 0, timePlayed: 0,
      },
    },
    bombs: [],
    splash: [],
    bonuses: [],
    boundaries: [
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 2, y: -1 },
      { x: 3, y: -1 },
      { x: 4, y: -1 },
      { x: 5, y: -1 },
      { x: 6, y: -1 },
      { x: 7, y: -1 },
      { x: 8, y: -1 },
      { x: 9, y: -1 },
      { x: 10, y: -1 },
      { x: 11, y: -1 },
      { x: 12, y: -1 },
      { x: 0, y: 13 },
      { x: 1, y: 13 },
      { x: 2, y: 13 },
      { x: 3, y: 13 },
      { x: 4, y: 13 },
      { x: 5, y: 13 },
      { x: 6, y: 13 },
      { x: 7, y: 13 },
      { x: 8, y: 13 },
      { x: 9, y: 13 },
      { x: 10, y: 13 },
      { x: 11, y: 13 },
      { x: 12, y: 13 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: -1, y: 2 },
      { x: -1, y: 3 },
      { x: -1, y: 4 },
      { x: -1, y: 5 },
      { x: -1, y: 6 },
      { x: -1, y: 7 },
      { x: -1, y: 8 },
      { x: -1, y: 9 },
      { x: -1, y: 10 },
      { x: -1, y: 11 },
      { x: -1, y: 12 },
      { x: 13, y: 0 },
      { x: 13, y: 1 },
      { x: 13, y: 2 },
      { x: 13, y: 3 },
      { x: 13, y: 4 },
      { x: 13, y: 5 },
      { x: 13, y: 6 },
      { x: 13, y: 7 },
      { x: 13, y: 8 },
      { x: 13, y: 9 },
      { x: 13, y: 10 },
      { x: 13, y: 11 },
      { x: 13, y: 12 },
    ],
    walls: [
      {
        x: 1, y: 1, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 3, y: 1, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 5, y: 1, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 7, y: 1, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 9, y: 1, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 11, y: 1, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 1, y: 3, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 3, y: 3, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 5, y: 3, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 7, y: 3, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 9, y: 3, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 11, y: 3, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 1, y: 5, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 3, y: 5, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 5, y: 5, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 7, y: 5, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 9, y: 5, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 11, y: 5, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 1, y: 7, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 3, y: 7, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 5, y: 7, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 7, y: 7, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 9, y: 7, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 11, y: 7, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 1, y: 9, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 3, y: 9, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 5, y: 9, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 7, y: 9, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 9, y: 9, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 11, y: 9, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 1, y: 11, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 3, y: 11, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 5, y: 11, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 7, y: 11, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 9, y: 11, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
      {
        x: 11, y: 11, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
      },
    ],
    intervalCounter: 0,
    gridsize: 32,
    gameTimer: 0,
  };
}

function findRoomGameState(roomId) {
  let currGameState;

  Object.keys(globalGameState).forEach((el) => {
    if (el === roomId) {
      currGameState = globalGameState[el];
    }
  });

  return currGameState;
}

module.exports = {
  initialGameState, globalGameState, rooms, socketRooms, findRoomGameState,
};
