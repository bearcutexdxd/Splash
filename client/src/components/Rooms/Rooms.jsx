import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import currentRoomAC from '../../redux/actions/currentRoomAction';
import { getRoomsAC, getRooms } from '../../redux/actions/roomsAction';
import Navbar from '../Navbar/Navbar';

function Rooms({ socket }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const rooms = useSelector((store) => store.rooms);
  const [gameName, setGameName] = useState('');

  useEffect(() => {
    dispatch(getRooms());
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
  }

  function joinGameHandle(room) {
    socket.emit('joinRoom', room, user);
  }

  function updateGameHandle() {
    dispatch(getRooms());
  }

  socket.on('getRoomName', (roomId) => {
    setGameName(roomId);
    dispatch(currentRoomAC(roomId));
  });

  console.log(rooms);
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="flex items-start mt-20">
          <button
            className="animation"
            type="button"
            onClick={createGameHandle}
          >
            <img src="https://svgsilh.com/svg/2923485-673ab7.svg" width="120px" alt="sory" />
          </button>
          <div className="flex flex-col">
            {Object.keys(rooms).map((room) => (
              <div key={room} className="">
                <h2 className="text-2xl mt-12 text-info">
                  {`Room-number---${room}`}
                  <br />
                  {`Playr-in-room------${rooms[room]}`}
                </h2>
                <Link to="/game">
                  <button
                    className="btn btn-primary mt-4 text-info"
                    type="button"
                    onClick={() => joinGameHandle(room)}
                  >
                    Join game
                  </button>
                </Link>
              </div>
            ))}
          </div>
          <button className="animation" type="button" onClick={updateGameHandle}>
            <img src="https://svgsilh.com/svg/31199-673ab7.svg" width="80px" alt="sory" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Rooms;
