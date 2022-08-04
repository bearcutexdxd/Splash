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
    // dispatch(getRooms());
  }

  function joinGameHandle(room) {
    socket.emit('joinRoom', room, user);
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
        <div className="m-auto h-screen flex justify-center items-center flex-col">
          {Object.keys(rooms).map((room) => (
            <div key={room} className="m-auto h-screen flex justify-center items-center flex-col">
              <h2 className="text-2xl mt-12 text-info">
                {`Room number ${room}`}
                <br />
                {`Playr in room ${rooms[room]}`}
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
      </div>
    </>
  );
}

export default Rooms;
