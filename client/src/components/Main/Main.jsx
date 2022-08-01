/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typewriter } from 'react-simple-typewriter';

function Main({ socket }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [gameName, setGameName] = useState('');
  const user = useSelector((store) => store.user);

  function inputHandle(e) {
    setInput(e.target.value);
  }

  function createGameHandle() {
    socket.emit('createRoom');
  }

  function joinGameHandle() {
    socket.emit('joinRoom', input, user);
  }

  socket.on('getRoomName', (roomId) => {
    setGameName(roomId);
  });

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-2xl mt-12 text-info">
          <span>
            <Typewriter
              cursor
              cursorStyle="_"
              typeSpeed={30}
              deleteSpeed={50}
              delaySpeed={1000000}
              words={['you will Splash this final project!']}
            />
          </span>
        </h1>
        <h2>{gameName}</h2>
      </div>
      <div className="flex justify-center items-center">
        <div className="m-auto h-screen flex justify-center items-center flex-col">
          <button className="btn btn-primary mt-4 text-info" type="button">
            <Link to="/game">play</Link>
          </button>
          <button
            className="btn btn-primary mt-4 text-info"
            type="button"
            onClick={createGameHandle}
          >
            Create game
          </button>
          <Link to="/game">
            <button
              className="btn btn-primary mt-4 text-info"
              type="button"
              onClick={joinGameHandle}
            >
              Join game
            </button>
          </Link>
          <input
            onChange={inputHandle}
            type="text"
            value={input}
            placeholder="Type here"
            className="input mt-4 input-bordered input-warning w-full max-w-xs text-info text-center"
          />
        </div>
      </div>
    </>
  );
}

export default Main;
