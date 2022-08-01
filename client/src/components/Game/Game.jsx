import React, {
  useRef, useEffect, memo, useMemo,
  useCallback,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getRoomsAC from '../../redux/actions/roomsAction';

const BG_COLOR = '#ffffff';
const PLAYER_COLOR1 = '#fa8072';
const PLAYER_COLOR2 = '#B84CAB';
const PLAYER_COLOR3 = '#87F03D';
const PLAYER_COLOR4 = '#3DCDF0';

function Game({ socket }) {
  const gameState = useSelector((store) => store.gameState);
  const canvasRef = useRef();
  const [currRoomId, setCurrRoomId] = useState();

  const [listenKey, setListenKey] = useState(false);
  const [playerId, setPlayerId] = useState();
  const [socketRooms, setSocketRooms] = useState([{ userId: '23432' }, { name: 'yes' }]);

  const dispatch = useDispatch();

  socket.on('startGame', (roomId) => {
    setCurrRoomId(roomId);
    setListenKey(true);
    console.log('game started!');
  });

  socket.on('playerId', (playerNum) => {
    setPlayerId(playerNum);
  });
  const rooms = useSelector((store) => store.rooms);

  useEffect(() => {
    socket.on('socketRooms', (playrRoom) => {
      dispatch(getRoomsAC(playrRoom));
      console.log('new user in room');
    });
  }, [rooms]);

  // useEffect(() => {
  //   socket.on('socketRooms', (playrRoom) => {
  //     setSocketRooms(playrRoom);
  //     console.log('new user in room');
  //   });
  // }, [socketRooms]);

  useEffect(() => { // event listener
    window.addEventListener('keydown', (e) => {
      if (listenKey) socket.emit('keydown', e.key, currRoomId, playerId);
    });
  }, [listenKey]);

  const draw = useCallback((ctx, canvas, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  const drawPlayer = (ctx, color, size, playerPos) => {
    ctx.fillStyle = color;
    ctx.fillRect(playerPos.x * size, playerPos.y * size, size, size);
  };

  useEffect(() => { // drawing on canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    const { gridsize } = gameState;
    const size = canvas.width / gridsize;
    const player1Pos = gameState.player1.pos;
    const player2Pos = gameState.player2.pos;
    const player3Pos = gameState.player3.pos;
    const player4Pos = gameState.player4.pos;

    draw(ctx, canvas, BG_COLOR);

    if (player1Pos) drawPlayer(ctx, PLAYER_COLOR1, size, player1Pos);
    if (player2Pos) drawPlayer(ctx, PLAYER_COLOR2, size, player2Pos);
    if (player3Pos) drawPlayer(ctx, PLAYER_COLOR3, size, player3Pos);
    if (player4Pos) drawPlayer(ctx, PLAYER_COLOR4, size, player4Pos);
  }, [gameState]);

  return (
    <>
      {rooms.map((el) => (
        <div key={el.userId}>{el.name}</div>
      ))}
      <div className="flex justify-center items-center mt-12">
        <canvas ref={canvasRef} className="game-canvas" />
      </div>
    </>
  );
}

export default memo(Game);
