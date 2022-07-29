/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Main({ socket }) {
  const [input, setInput] = useState('');
  const [gameName, setGameName] = useState('');

  function inputHandle(e) {
    setInput(e.target.value);
  }

  function createGameHandle() {
    socket.emit('createRoom');
  }

  function joinGameHandle() {
    socket.emit('joinRoom', input);
  }

  socket.on('getRoomName', (roomId) => {
    setGameName(roomId);
  });

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-2xl mt-12">you will Splash this final project!</h1>
        <h2>{gameName}</h2>
      </div>
      <div className="flex justify-center items-center">
        <div className="m-auto h-screen flex justify-center items-center flex-col">
          <button className="btn btn-success mt-4" type="button">
            <Link to="/game">play</Link>
          </button>
          <button className="btn btn-success mt-4" type="button" onClick={createGameHandle}>create game</button>
          <Link to="/game"><button className="btn btn-success mt-4" type="button" onClick={joinGameHandle}>join game</button></Link>
          <input onChange={inputHandle} type="text" placeholder="Type here" className="input w-full max-w-xs mt-4" />
        </div>
      </div>
    </>
  );
}

export default Main;
