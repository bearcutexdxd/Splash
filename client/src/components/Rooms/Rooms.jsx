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

  return (
    <>
      <Navbar colorRoom="#18614b" />
      <div id="rooms">
        <div className="absolute top-24 left-1/3 ml-16">
          <button className="btn bg-[#95cb3f] w-56 btn-lg border-none text-white hover:bg-[#87b738] text-xl" type="button" onClick={createGameHandle}>create lobby</button>
        </div>
        <div className="absolute top-24 right-1/3 mr-16">
          <button className="btn bg-[#95cb3f] w-56 btn-lg border-none text-white hover:bg-[#87b738] text-xl" type="button" onClick={updateGameHandle}>update</button>
        </div>
        <div className="flex justify-around flex-wrap pt-36">
          {Object.keys(rooms).map((room) => (
            <div key={room} className={`card w-72 shadow-xl ml-4 mr-4 mb-4 bg-primary text-primary-content ${rooms[room] < 4 && 'bg-teal-700'}`}>
              <div className="card-body">
                <h2 className="card-title">{room}</h2>
                <p>{`Players: ${rooms[room]} / 4`}</p>
                <div className="card-actions justify-end">
                  <Link to="/game">
                    <button className="btn btn-warning" type="button" onClick={() => joinGameHandle(room)}>join</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Rooms;
