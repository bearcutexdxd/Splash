/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typewriter } from 'react-simple-typewriter';

import { getRooms } from '../../redux/actions/roomsAction';
import currentRoomAC from '../../redux/actions/currentRoomAction';
import Navbar from '../Navbar/Navbar';

function Main({ socket }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [gameName, setGameName] = useState('');
  const user = useSelector((store) => store.user);

  useEffect(() => {
    socket.emit('getRooms');
  }, []);

  useEffect(() => {
    if (gameName) {
      console.log(gameName);
      socket.emit('joinRoom', gameName, user);
      navigate('/game');
    }
  }, [gameName]);

  function createGameHandle() {
    socket.emit('createRoom');
    // dispatch(getRooms());
  }

  socket.on('getRoomName', (roomId) => {
    setGameName(roomId);
    dispatch(currentRoomAC(roomId));
  });

  return (
    <>
      <Navbar />
      <div className="backmain">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-2xl mt-12 text-warning">
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
            <Link to={`/PersonalArea/${user.id}`}>
              <button className="btn btn-primary mt-4 text-info" type="button">Profail</button>
              {' '}
            </Link>
            <Link to="/rooms">
              <button className="btn btn-primary mt-4 text-info" type="button">Rooms</button>
              {' '}
            </Link>
            <Link to="/shop">
              <button className="btn btn-primary mt-4 text-info" type="button">
                Shop
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
