/* eslint-disable array-callback-return */
import React, {
  useRef, useEffect, memo, useState, useLayoutEffect,
} from 'react';

import Konva from 'konva';

import {
  Image, Layer, Rect, Stage,
} from 'react-konva';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router';
import characterSkin1 from '../../assets/images/skins/pipo-nekonin001.png';
import characterSkin2 from '../../assets/images/skins/pipo-nekonin002.png';
import characterSkin3 from '../../assets/images/skins/pipo-nekonin003.png';
import characterSkin4 from '../../assets/images/skins/pipo-nekonin004.png';
import balloonImage from '../../assets/images/bomb/bomb.png';
import splashImage from '../../assets/images/splash/splash.png';

import { getCurrRoomAC, getCurrRoom, getRoomsAC } from '../../redux/actions/roomsAction';
import wallImage from '../../assets/images/walls/wall.png';
import bonusImage1 from '../../assets/images/skins/pipo-nekonin006.png';
import bonusImage2 from '../../assets/images/skins/pipo-nekonin007.png';
import bonusImage3 from '../../assets/images/skins/pipo-nekonin008.png';

function Game({
  socket, listenKey, setListenKey, currRoomId,
}) {
  // store data
  const gameState = useSelector((store) => store.gameState);

  const currRoom = useSelector((store) => store.currRoom);

  const rooms = useSelector((store) => store.rooms);
  const currentRoom = useSelector((store) => store.currentRoom);

  const { bombs } = gameState;
  const { splash } = gameState;
  const { walls } = gameState;

  const dispatch = useDispatch();

  const { bonuses } = gameState;
  const navigate = useNavigate();

  // player id state
  const [winner, setWinner] = useState();
  const [playerId, setPlayerId] = useState();

  // images states
  const [skin1State, setSkin1State] = useState(new window.Image());
  const [skin2State, setSkin2State] = useState(new window.Image());
  const [skin3State, setSkin3State] = useState(new window.Image());
  const [skin4State, setSkin4State] = useState(new window.Image());
  const [balloonState, setBalloonState] = useState(new window.Image());
  const [splashState, setSplashState] = useState(new window.Image());

  const [gameEnd, setGameEnd] = useState(false);
  const [scoreWin, setScoreWin] = useState(true);

  const [wallState, setWallState] = useState(new window.Image());
  const [bonus1State, setBonus1State] = useState(new window.Image());
  const [bonus2State, setBonus2State] = useState(new window.Image());
  const [bonus3State, setBonus3State] = useState(new window.Image());

  // images refs
  const skin1Ref = useRef();
  const skin2Ref = useRef();
  const skin3Ref = useRef();
  const skin4Ref = useRef();
  const balloonRef = useRef();
  const splashRef = useRef();
  const wallRef = useRef();
  const bonus1Ref = useRef();
  const bonus2Ref = useRef();
  const bonus3Ref = useRef();

  // const values
  const gridsize = 32;
  const tileAmount = 13;

  socket.on('playerId', (playerNum) => {
    console.log('in socket player id');
    setPlayerId(playerNum);
  });

  // player lost, show stats from this currGameState
  socket.on('lose', (currGameState, player) => {
    if (player === playerId) {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      setGameEnd(true);
      setListenKey(false);
      setScoreWin(false);
      console.log('you lost D:');
    }
  });

  useEffect(() => {
    if (scoreWin) {
      socket.on('win', (currGameState, winnerId) => {
        setWinner(winnerId);
        if (winnerId === playerId) {
          console.log(scoreWin);
          window.removeEventListener('keydown', onKeyDown);
          window.removeEventListener('keyup', onKeyUp);
          setListenKey(false);
          console.log('you won!');
        }
      });
    }
  }, [scoreWin]);

  // // player won, show stats from this currGameState
  // socket.on('win', (currGameState, winnerId) => {
  //   setWinner(winnerId);
  //   if (winnerId === playerId) {
  //     console.log(scoreWin);
  //     if (scoreWin) {
  //       window.removeEventListener('keydown', onKeyDown);
  //       window.removeEventListener('keyup', onKeyUp);
  //       setListenKey(false);
  //       console.log('you won!');
  //     }
  //   }
  // });

  // game in progress handler
  socket.on('gameInProgress', () => {
    navigate('/main');
    console.log('this game is in progress');
  });

  // gameEnd without AFK
  socket.on('gameEnd', (currGameState, alivePlayer) => {
    setWinner(alivePlayer);
    if (alivePlayer === playerId) {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      setListenKey(false);
      console.log('you won! by pure strength');
    }
  });

  useEffect(() => {
  }, [playerId, winner]);

  useEffect(() => () => {
    socket.emit('disconnectNavigate', currentRoom);
    setScoreWin(true);
  }, []);

  useEffect(() => {
    dispatch(getCurrRoom());
  }, []);

  useEffect(() => {
    socket.on('socketRooms', (playrRoom) => {
      dispatch(getCurrRoomAC(playrRoom));
      console.log('new user in room');
    });
  }, [currRoom]);

  useEffect(() => { // loading all images
    const skin1 = new window.Image();
    skin1.src = characterSkin1;
    setSkin1State(skin1);

    const skin2 = new window.Image();
    skin2.src = characterSkin2;
    setSkin2State(skin2);

    const skin3 = new window.Image();
    skin3.src = characterSkin3;
    setSkin3State(skin3);

    const skin4 = new window.Image();
    skin4.src = characterSkin4;
    setSkin4State(skin4);

    const balloon = new window.Image();
    balloon.src = balloonImage;
    setBalloonState(balloon);

    const splashImg = new window.Image();
    splashImg.src = splashImage;
    setSplashState(splashImg);

    const wallImg = new window.Image();
    wallImg.src = wallImage;
    setWallState(wallImg);

    const bonus1 = new window.Image();
    bonus1.src = bonusImage1;
    setBonus1State(bonus1);

    const bonus2 = new window.Image();
    bonus2.src = bonusImage2;
    setBonus2State(bonus2);

    const bonus3 = new window.Image();
    bonus3.src = bonusImage3;
    setBonus3State(bonus3);

    skin1Ref.current.setAttrs({
      cropX: gridsize, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
    });
    skin2Ref.current.setAttrs({
      cropX: gridsize, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
    });
    skin3Ref.current.setAttrs({
      cropX: gridsize, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
    });
    skin4Ref.current.setAttrs({
      cropX: gridsize, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
    });
  }, []);

  useEffect(() => { // event listeners
    if (listenKey) {
      window.addEventListener('keydown', onKeyDown);
    }
    if (listenKey) {
      window.addEventListener('keyup', onKeyUp);
    }
  }, [listenKey]);

  function onKeyUp(event) {
    if (listenKey) socket.emit('keyup', event.key, currRoomId, playerId);
  }

  function onKeyDown(event) {
    if (listenKey) socket.emit('keydown', event.key, currRoomId, playerId);
  }

  useEffect(() => {
    wallRef?.current?.cache();
  }, [wallState]);

  useEffect(() => { // main drawing
    wallRef?.current?.cache();
    wallRef?.current?.filters([Konva.Filters.Brighten]);
    wallRef?.current?.brightness(0.3);

    switch (gameState.player1.direction) {
      case 'up':
        switch (gameState.player1.animation) {
          case '1':
            skin1Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize * 3, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '2':
            skin1Ref.current.setAttrs({
              cropX: 0, cropY: gridsize * 3, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '3':
            skin1Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize * 3, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '4':
            skin1Ref.current.setAttrs({
              cropX: gridsize * 2, cropY: gridsize * 3, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          default:
            break;
        }
        break;
      case 'left':
        switch (gameState.player1.animation) {
          case '1':
            skin1Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '2':
            skin1Ref.current.setAttrs({
              cropX: 0, cropY: gridsize, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '3':
            skin1Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '4':
            skin1Ref.current.setAttrs({
              cropX: gridsize * 2, cropY: gridsize, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          default:
            break;
        }
        break;
      case 'down':
        switch (gameState.player1.animation) {
          case '1':
            skin1Ref.current.setAttrs({
              cropX: gridsize, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '2':
            skin1Ref.current.setAttrs({
              cropX: 0, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '3':
            skin1Ref.current.setAttrs({
              cropX: gridsize, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '4':
            skin1Ref.current.setAttrs({
              cropX: gridsize * 2, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          default:
            break;
        }
        break;
      case 'right':
        switch (gameState.player1.animation) {
          case '1':
            skin1Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize * 2, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '2':
            skin1Ref.current.setAttrs({
              cropX: 0, cropY: gridsize * 2, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '3':
            skin1Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize * 2, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '4':
            skin1Ref.current.setAttrs({
              cropX: gridsize * 2, cropY: gridsize * 2, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          default:
            break;
        }
        break;

      default:
        break;
    }

    // second player crop animation

    switch (gameState.player2.direction) {
      case 'up':
        switch (gameState.player2.animation) {
          case '1':
            skin2Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize * 3, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '2':
            skin2Ref.current.setAttrs({
              cropX: 0, cropY: gridsize * 3, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '3':
            skin2Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize * 3, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '4':
            skin2Ref.current.setAttrs({
              cropX: gridsize * 2, cropY: gridsize * 3, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          default:
            break;
        }
        break;
      case 'left':
        switch (gameState.player2.animation) {
          case '1':
            skin2Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '2':
            skin2Ref.current.setAttrs({
              cropX: 0, cropY: gridsize, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '3':
            skin2Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '4':
            skin2Ref.current.setAttrs({
              cropX: gridsize * 2, cropY: gridsize, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          default:
            break;
        }
        break;
      case 'down':
        switch (gameState.player2.animation) {
          case '1':
            skin2Ref.current.setAttrs({
              cropX: gridsize, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '2':
            skin2Ref.current.setAttrs({
              cropX: 0, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '3':
            skin2Ref.current.setAttrs({
              cropX: gridsize, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '4':
            skin2Ref.current.setAttrs({
              cropX: gridsize * 2, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          default:
            break;
        }
        break;
      case 'right':
        switch (gameState.player2.animation) {
          case '1':
            skin2Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize * 2, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '2':
            skin2Ref.current.setAttrs({
              cropX: 0, cropY: gridsize * 2, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '3':
            skin2Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize * 2, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '4':
            skin2Ref.current.setAttrs({
              cropX: gridsize * 2, cropY: gridsize * 2, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          default:
            break;
        }
        break;

      default:
        break;
    }

    // third player crop animation

    switch (gameState.player3.direction) {
      case 'up':
        switch (gameState.player3.animation) {
          case '1':
            skin3Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize * 3, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '2':
            skin3Ref.current.setAttrs({
              cropX: 0, cropY: gridsize * 3, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '3':
            skin3Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize * 3, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '4':
            skin3Ref.current.setAttrs({
              cropX: gridsize * 2, cropY: gridsize * 3, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          default:
            break;
        }
        break;
      case 'left':
        switch (gameState.player3.animation) {
          case '1':
            skin3Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '2':
            skin3Ref.current.setAttrs({
              cropX: 0, cropY: gridsize, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '3':
            skin3Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '4':
            skin3Ref.current.setAttrs({
              cropX: gridsize * 2, cropY: gridsize, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          default:
            break;
        }
        break;
      case 'down':
        switch (gameState.player3.animation) {
          case '1':
            skin3Ref.current.setAttrs({
              cropX: gridsize, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '2':
            skin3Ref.current.setAttrs({
              cropX: 0, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '3':
            skin3Ref.current.setAttrs({
              cropX: gridsize, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '4':
            skin3Ref.current.setAttrs({
              cropX: gridsize * 2, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          default:
            break;
        }
        break;
      case 'right':
        switch (gameState.player3.animation) {
          case '1':
            skin3Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize * 2, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '2':
            skin3Ref.current.setAttrs({
              cropX: 0, cropY: gridsize * 2, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '3':
            skin3Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize * 2, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '4':
            skin3Ref.current.setAttrs({
              cropX: gridsize * 2, cropY: gridsize * 2, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          default:
            break;
        }
        break;

      default:
        break;
    }

    // fourth player crop animation

    switch (gameState.player4.direction) {
      case 'up':
        switch (gameState.player4.animation) {
          case '1':
            skin4Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize * 3, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '2':
            skin4Ref.current.setAttrs({
              cropX: 0, cropY: gridsize * 3, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '3':
            skin4Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize * 3, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '4':
            skin4Ref.current.setAttrs({
              cropX: gridsize * 2, cropY: gridsize * 3, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          default:
            break;
        }
        break;
      case 'left':
        switch (gameState.player4.animation) {
          case '1':
            skin4Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '2':
            skin4Ref.current.setAttrs({
              cropX: 0, cropY: gridsize, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '3':
            skin4Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '4':
            skin4Ref.current.setAttrs({
              cropX: gridsize * 2, cropY: gridsize, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          default:
            break;
        }
        break;
      case 'down':
        switch (gameState.player4.animation) {
          case '1':
            skin4Ref.current.setAttrs({
              cropX: gridsize, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '2':
            skin4Ref.current.setAttrs({
              cropX: 0, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '3':
            skin4Ref.current.setAttrs({
              cropX: gridsize, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '4':
            skin4Ref.current.setAttrs({
              cropX: gridsize * 2, cropY: 0, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          default:
            break;
        }
        break;
      case 'right':
        switch (gameState.player4.animation) {
          case '1':
            skin4Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize * 2, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '2':
            skin4Ref.current.setAttrs({
              cropX: 0, cropY: gridsize * 2, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '3':
            skin4Ref.current.setAttrs({
              cropX: gridsize, cropY: gridsize * 2, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          case '4':
            skin4Ref.current.setAttrs({
              cropX: gridsize * 2, cropY: gridsize * 2, cropWidth: gridsize, cropHeight: gridsize,
            });
            break;
          default:
            break;
        }
        break;

      default:
        break;
    }
  }, [gameState]);

  return (

    <>
      <div>
        {currRoom.map((el) => (
          <div key={el.userId}>{el.name}</div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-24 min-h-[100vh] bg-gray-700">
        {gameEnd ? <h1 className="text-black">you lost :D</h1> : null}
        <div className="min-h-[100vh] bg-gray-700">
          <div className="flex justify-center items-center pt-32">

            <Stage width={gridsize * tileAmount} height={gridsize * tileAmount} className="game-canvas">
              <Layer>
                {splash?.map((el) => el.pos.map((el2) => (
                  <Image
                    image={splashState}
                    x={el2.x * gridsize}
                    y={el2.y * gridsize}
                    width={gameState.gridsize}
                    height={gameState.gridsize}
                    ref={splashRef}
                    key={el2.id}
                  />
                )))}
              </Layer>
              <Layer>

                {walls?.map((el) => {
                  if (el.timer % 10 < 5 && el.timer !== 30) {
                    return (
                      <Image
                        image={wallState}
                        x={el.x * gridsize}
                        y={el.y * gridsize}
                        // filters={[Konva.Filters.Brighten]}
                        // brightness={0.3}
                        width={gameState.gridsize}
                        height={gameState.gridsize}
                        key={el.id}
                        opacity={0.2}
                        ref={wallRef}
                      />
                    );
                  }
                  return (
                    <Image
                      image={wallState}
                      x={el.x * gridsize}
                      y={el.y * gridsize}
                      // filters={[Konva.Filters.Brighten]}
                      // brightness={0.3}
                      width={gameState.gridsize}
                      height={gameState.gridsize}
                      key={el.id}
                      opacity={1}
                      ref={wallRef}
                    />
                  );
                })}

              </Layer>
              <Layer>
                {bombs?.map((el) => (
                  <Image
                    image={balloonState}
                    x={el.x * gridsize}
                    y={el.y * gridsize}
                    width={gameState.gridsize}
                    height={gameState.gridsize}
                    ref={balloonRef}
                    key={el.id}
                  />
                ))}
              </Layer>
              <Layer>
                <Image
                  image={skin1State}
                  x={gameState.player1.pos.x}
                  y={gameState.player1.pos.y}
                  width={gameState.gridsize}
                  height={gameState.gridsize}
                  ref={skin1Ref}
                  visible={!!gameState.player1.hp}
                />
                <Image
                  image={skin2State}
                  x={gameState.player2.pos.x}
                  y={gameState.player2.pos.y}
                  width={gameState.gridsize}
                  height={gameState.gridsize}
                  ref={skin2Ref}
                  visible={!!gameState.player2.hp}
                />
                <Image
                  image={skin3State}
                  x={gameState.player3.pos.x}
                  y={gameState.player3.pos.y}
                  width={gameState.gridsize}
                  height={gameState.gridsize}
                  ref={skin3Ref}
                  visible={!!gameState.player3.hp}
                />
                <Image
                  image={skin4State}
                  x={gameState.player4.pos.x}
                  y={gameState.player4.pos.y}
                  width={gameState.gridsize}
                  height={gameState.gridsize}
                  ref={skin4Ref}
                  visible={!!gameState.player4.hp}
                />
              </Layer>

              <Layer>
                {bonuses.map((el) => {
                  if (el.bonus === 'speed') {
                    return (
                      <Image
                        image={bonus1State}
                        x={el.x * gridsize}
                        y={el.y * gridsize}
                        width={gameState.gridsize}
                        height={gameState.gridsize}
                        ref={bonus1Ref}
                      />
                    );
                  } if (el.bonus === 'life') {
                    return (
                      <Image
                        image={bonus2State}
                        x={el.x * gridsize}
                        y={el.y * gridsize}
                        width={gameState.gridsize}
                        height={gameState.gridsize}
                        ref={bonus2Ref}
                      />
                    );
                  }
                  return (
                    <Image
                      image={bonus3State}
                      x={el.x * gridsize}
                      y={el.y * gridsize}
                      width={gameState.gridsize}
                      height={gameState.gridsize}
                      ref={bonus3Ref}
                    />
                  );
                })}
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Game);
