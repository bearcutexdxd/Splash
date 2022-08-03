import { combineReducers } from 'redux';
import userReducer from './userReducer';
import statisticsReducer from './statisticsReducer';
import gameStateReducer from './gameStateReducer';
import roomsReducer from './roomsReducer';

import currRoomReducer from './currRoomReducer';
import currentRoomReducer from './currentRoomReducer';
import playerIdReducer from './playerIdReducer';
import listenKeyReducer from './listenKeyReducer';

const rootReducer = combineReducers({
  user: userReducer,
  stats: statisticsReducer,
  gameState: gameStateReducer,
  currRoom: currRoomReducer,
  rooms: roomsReducer,
  currentRoom: currentRoomReducer,
  playerId: playerIdReducer,
  listenKey: listenKeyReducer,
});

export default rootReducer;
