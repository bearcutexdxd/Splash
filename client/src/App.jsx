import { Route, Routes } from 'react-router';
import { io } from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Main from './components/Main/Main';
import Game from './components/Game/Game';
import About from './components/About/About';
import * as endPoints from './config/endPoints';
import { checkAuth } from './redux/actions/userAction';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import PersonalArea from './components/PersonalArea/PersonalArea';
import setGameStateAC from './redux/actions/gameStateAction';

import Rooms from './components/Rooms/Rooms';

import Shop from './components/Shop/Shop';

const socket = io(endPoints.host());
socket.on('connect', () => console.log(socket.id));

function App() {
  const [listenKey, setListenKey] = useState(false);
  const dispatch = useDispatch();

  socket.on('startGame', (roomId) => {
    setListenKey(true);
    console.log('game started!');
    socket.emit('start game timer');
  });

  socket.on('gameState', (state) => {
    dispatch(setGameStateAC(state));
  });

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <div>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<PrivateRoute><Main socket={socket} /></PrivateRoute>} />
          <Route path="/rooms" element={<PrivateRoute><Rooms socket={socket} /></PrivateRoute>} />
          <Route
            path="/game"
            element={(
              <PrivateRoute>
                <Game listenKey={listenKey} setListenKey={setListenKey} socket={socket} />
              </PrivateRoute>
            )}
          />
          <Route path="/personalArea/:id" element={<PrivateRoute><PersonalArea /></PrivateRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </div>

    </div>

  );
}

export default App;
