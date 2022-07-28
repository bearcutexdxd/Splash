import { Route, Routes } from 'react-router';
import { io } from 'socket.io-client';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Game from './components/Game/Game';
import About from './components/About/About';

const socket = io('http://localhost:3030');
socket.on('connect', () => console.log(socket.id));

function App() {
  const [gameState, setGameState] = useState({});

  socket.on('initialGameState', (state) => {
    setGameState(state);
  });

  socket.on('gameState', (state) => {
    setGameState(state);
  });

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/game" element={<Game gameState={gameState} socket={socket} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
