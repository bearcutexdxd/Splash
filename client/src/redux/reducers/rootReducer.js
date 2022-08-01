import { combineReducers } from 'redux';
import userReducer from './userReducer';
import statisticsReducer from './statisticsReducer';
import gameStateReducer from './gameStateReducer';
import roomsReducer from './roomsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  stats: statisticsReducer,
  gameState: gameStateReducer,
  rooms: roomsReducer,
});

export default rootReducer;
