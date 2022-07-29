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
import { getStats } from './redux/actions/statisticsAction';

const socket = io(endPoints.host());
const init = {
  player1: {
    pos: {
      x: 0,
      y: 0,
    },
  },
  player2: {
    pos: {
      x: 19,
      y: 0,
    },
  },
  player3: {
    pos: {
      x: 0,
      y: 19,
    },
  },
  player4: {
    pos: {
      x: 19,
      y: 19,
    },
  },
  gridsize: 20,
};

socket.on('connect', () => console.log(socket.id));

function App() {
  const [gameState, setGameState] = useState(init);

  socket.on('gameState', (state) => {
    setGameState(state);
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <div>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<PrivateRoute><Main socket={socket} /></PrivateRoute>} />
          <Route path="/game" element={<PrivateRoute><Game gameState={gameState} socket={socket} /></PrivateRoute>} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

    </div>

  );
}

export default App;
