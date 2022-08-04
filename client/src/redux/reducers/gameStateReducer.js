/* eslint-disable default-param-last */
import { SET_GAMESTATE } from '../types';

const { v4: uuidv4 } = require('uuid');

const wallTimer = 30;
const invulnerabilityTimer = 30;
const speed = 1;
const bonusesTimer = 600;

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
  bonuses: [],
  boundaries: [
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
      x: 6, y: 12, id: uuidv4(), hp: 1, wallTimer, invulnerability: { active: false, timer: invulnerabilityTimer },
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
