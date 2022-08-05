/* eslint-disable default-param-last */
import { SET_GAMESTATE } from '../types';

const { v4: uuidv4 } = require('uuid');

const wallTimer = 30;
const invulnerabilityTimer = 30;
const speed = 1;
const bonusesTimer = 1200;

const initialState = {
  player1: {
    direction: 'down',
    animation: '1',
    movement: {
      down: false, up: false, left: false, right: false,
    },
    pos: {
      x: 5 * 32,
      y: 2 * 32,
    },
    hp: 1,
    speed,
    strength: 1,
    isAlive: true,
    skin: 0,
    maxBombs: 1,
    bombsCounter: 0,
    lastDamageFrom: 0,
    invulnerability: { active: false, timer: invulnerabilityTimer },
    bonusesTimer: { speed: { active: false, timer: bonusesTimer }, moreBombs: { active: false, timer: bonusesTimer }, strength: { active: false, timer: bonusesTimer } },
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
      x: 17 * 32,
      y: 2 * 32,
    },
    hp: 1,
    speed,
    strength: 1,
    isAlive: true,
    skin: 0,
    maxBombs: 1,
    bombsCounter: 0,
    lastDamageFrom: 0,
    invulnerability: { active: false, timer: invulnerabilityTimer },
    bonusesTimer: { speed: { active: false, timer: bonusesTimer }, moreBombs: { active: false, timer: bonusesTimer }, strength: { active: false, timer: bonusesTimer } },
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
      x: 5 * 32,
      y: 14 * 32,
    },
    hp: 1,
    speed,
    strength: 1,
    isAlive: true,
    maxBombs: 1,
    bombsCounter: 0,
    lastDamageFrom: 0,
    invulnerability: { active: false, timer: invulnerabilityTimer },
    bonusesTimer: { speed: { active: false, timer: bonusesTimer }, moreBombs: { active: false, timer: bonusesTimer }, strength: { active: false, timer: bonusesTimer } },
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
      x: 17 * 32,
      y: 14 * 32,
    },
    hp: 1,
    speed,
    strength: 1,
    isAlive: true,
    maxBombs: 1,
    bombsCounter: 0,
    lastDamageFrom: 0,
    invulnerability: { active: false, timer: invulnerabilityTimer },
    bonusesTimer: { speed: { active: false, timer: bonusesTimer }, moreBombs: { active: false, timer: bonusesTimer }, strength: { active: false, timer: bonusesTimer } },
    statistics: {
      kills: 0, deaths: 0, loses: 0, wins: 0, timePlayed: 0,
    },
  },
  bombs: [],
  splash: [],
  bonuses: [
    {
      x: 6, y: 8, id: uuidv4(), bonus: 'speed',
    },
    {
      x: 11, y: 3, id: uuidv4(), bonus: 'speed',
    },
    {
      x: 16, y: 8, id: uuidv4(), bonus: 'speed',
    },
    {
      x: 11, y: 13, id: uuidv4(), bonus: 'speed',
    },
    {
      x: 11, y: 8, id: uuidv4(), bonus: 'life',
    },
    {
      x: 9, y: 6, id: uuidv4(), bonus: 'moreBombs',
    },
    {
      x: 13, y: 6, id: uuidv4(), bonus: 'moreBombs',
    },
    {
      x: 9, y: 10, id: uuidv4(), bonus: 'moreBombs',
    },
    {
      x: 13, y: 10, id: uuidv4(), bonus: 'moreBombs',
    },
  ],
  boundaries: [
    { x: 4, y: 1 },
    { x: 4, y: 2 },
    { x: 4, y: 3 },
    { x: 4, y: 4 },
    { x: 4, y: 5 },
    { x: 4, y: 6 },
    { x: 4, y: 7 },
    { x: 4, y: 8 },
    { x: 4, y: 9 },
    { x: 4, y: 10 },
    { x: 4, y: 11 },
    { x: 4, y: 12 },
    { x: 4, y: 13 },
    { x: 4, y: 14 },
    { x: 5, y: 15 },
    { x: 6, y: 15 },
    { x: 7, y: 15 },
    { x: 8, y: 15 },
    { x: 9, y: 15 },
    { x: 10, y: 15 },
    { x: 11, y: 15 },
    { x: 12, y: 15 },
    { x: 13, y: 15 },
    { x: 14, y: 15 },
    { x: 15, y: 15 },
    { x: 16, y: 15 },
    { x: 17, y: 15 },
    { x: 18, y: 15 },
    { x: 18, y: 14 },
    { x: 18, y: 13 },
    { x: 18, y: 12 },
    { x: 18, y: 11 },
    { x: 18, y: 10 },
    { x: 18, y: 9 },
    { x: 18, y: 8 },
    { x: 18, y: 7 },
    { x: 18, y: 6 },
    { x: 18, y: 5 },
    { x: 18, y: 4 },
    { x: 18, y: 3 },
    { x: 18, y: 2 },
    { x: 18, y: 1 },
    { x: 17, y: 1 },
    { x: 16, y: 1 },
    { x: 15, y: 1 },
    { x: 14, y: 1 },
    { x: 13, y: 1 },
    { x: 12, y: 1 },
    { x: 11, y: 1 },
    { x: 10, y: 1 },
    { x: 9, y: 1 },
    { x: 8, y: 1 },
    { x: 7, y: 1 },
    { x: 6, y: 1 },
    { x: 5, y: 1 },
  ],
  walls: [ // 5:2 - left top
    {
      x: 6, y: 3, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 7, y: 2, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 5, y: 4, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 7, y: 3, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 6, y: 4, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 10, y: 2, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 12, y: 2, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 9, y: 3, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 13, y: 3, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 8, y: 4, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 14, y: 4, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 7, y: 5, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 15, y: 5, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 6, y: 6, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 16, y: 6, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 5, y: 7, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 6, y: 7, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 16, y: 7, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 17, y: 7, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 5, y: 9, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 6, y: 9, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 16, y: 9, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 17, y: 9, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 6, y: 10, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 16, y: 10, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 7, y: 11, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 15, y: 11, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 8, y: 12, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 14, y: 12, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 9, y: 13, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 10, y: 13, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 12, y: 13, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 13, y: 13, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 10, y: 14, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 12, y: 14, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },

    {
      x: 16, y: 3, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 15, y: 2, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 17, y: 4, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 15, y: 3, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 16, y: 4, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },

    {
      x: 6, y: 13, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 5, y: 12, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 7, y: 14, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 7, y: 13, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 6, y: 12, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },

    {
      x: 16, y: 13, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 17, y: 12, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 15, y: 14, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 15, y: 13, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 16, y: 12, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 16, y: 12, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 10, y: 3, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 12, y: 3, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 8, y: 5, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 10, y: 5, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 12, y: 5, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 14, y: 5, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 10, y: 6, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 12, y: 6, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 8, y: 7, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 10, y: 7, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 12, y: 7, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 14, y: 7, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 8, y: 9, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 10, y: 9, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 12, y: 9, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 14, y: 9, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 9, y: 7, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 13, y: 7, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 9, y: 9, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 13, y: 9, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 10, y: 10, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 12, y: 10, id: uuidv4(), hp: 2, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 8, y: 11, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 10, y: 11, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 12, y: 11, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
    {
      x: 14, y: 11, id: uuidv4(), hp: 'infinity', wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
    },
  ],
  gridsize: 32,
  gameTimer: 0,
};

const gameStateReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_GAMESTATE:
      return payload;
    default:
      return state;
  }
};

export default gameStateReducer;
