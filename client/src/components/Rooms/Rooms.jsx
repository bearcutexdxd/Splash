import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import currentRoomAC from '../../redux/actions/currentRoomAction';
import { getRoomsAC, getRooms } from '../../redux/actions/roomsAction';

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
    <div className="flex justify-center items-stretch m-6">
      <Link to="/rooms">
        <button className="btn btn-primary mt-4 text-info animation" type="button" onClick={createGameHandle}>
          New room
        </button>
      </Link>
      <ul className="menu">
        {Object.keys(rooms).map((room) => (
          <li key={room} className="">
            <Link to="/game" className="text-1xl mt-12 text-info items-end">
              {`Room number ${room}`}
              <br />
              {`Playr in room ${rooms[room]}`}
              <button
                className="btn btn-primary mt-4 text-info"
                type="button"
                onClick={() => joinGameHandle(room)}
              >
                Join game
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>

  );
}

export default Rooms;
