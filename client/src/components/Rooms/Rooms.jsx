import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRoomsAC, getRooms } from '../../redux/actions/roomsAction';

function Rooms({ socket }) {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const rooms = useSelector((store) => store.rooms);

  useEffect(() => {
    dispatch(getRooms());
  }, []);

  function joinGameHandle(room) {
    socket.emit('joinRoom', room, user);
  }

  console.log(rooms);
  return (
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

  );
}

export default Rooms;
