/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typewriter } from 'react-simple-typewriter';

import { getRooms } from '../../redux/actions/roomsAction';
import currentRoomAC from '../../redux/actions/currentRoomAction';
import Navbar from '../Navbar/Navbar';

import kittyGif from '../../assets/images/kitty.gif';

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
          <h1 className="text-3xl mt-8 text-white">
            <span>
              <Typewriter
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000000}
                words={['Are you ready to play?']}
              />
            </span>
          </h1>
          <div className="avatar">
            <div className="w-56 mt-8 rounded-full border-[8px] border-[#75e3f1] ring-offset-2 ring-8 ring-[#8d6ad8]">
              <img src={kittyGif} alt="" />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="m-auto flex justify-center items-center flex-col">
            <Link to="/rooms">
              <button className="btn bg-[#40cf58] w-56 btn-lg animation border-none mt-12 text-white hover:bg-[#40cf58] text-xl" type="button">Play</button>
              {' '}
            </Link>
            <Link to={`/PersonalArea/${user.id}`}>
              <button className="btn bg-[#8664cd] w-44 border-none mt-6 text-white text-base" type="button">Profile</button>
              {' '}
            </Link>
            <Link to="/shop">
              <button className="btn bg-[#8664cd] w-44 border-none mt-6 text-white text-base" type="button">
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
