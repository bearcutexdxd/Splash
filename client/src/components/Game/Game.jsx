/* eslint-disable consistent-return */
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
import bomb1 from '../../assets/images/bomb/bomb1.png';
import bomb2 from '../../assets/images/bomb/bomb2.png';
import bomb3 from '../../assets/images/bomb/bomb3.png';
import bomb4 from '../../assets/images/bomb/bomb4.png';
import splashImage from '../../assets/images/splash/splash.png';

import { getCurrRoomAC, getCurrRoom, getRoomsAC } from '../../redux/actions/roomsAction';
import unbreakableWallImage from '../../assets/images/walls/wall1.png';
import oneHPwallImage from '../../assets/images/walls/wall4.png';
import twoHPwallImage from '../../assets/images/walls/wall3.png';
import hitWallImage from '../../assets/images/walls/wallhit1.png';
import bonusImage1 from '../../assets/images/bonuses/speed.png';
import bonusImage2 from '../../assets/images/bonuses/life.png';
import bonusImage3 from '../../assets/images/bonuses/largerBomb.png';

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
  const { bonuses } = gameState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [gameEnd, setGameEnd] = useState(false);
  const [scoreWin, setScoreWin] = useState(true);

  const [winner, setWinner] = useState();
  const [playerId, setPlayerId] = useState();

  // images states
  const [skin1State, setSkin1State] = useState(new window.Image());
  const [skin2State, setSkin2State] = useState(new window.Image());
  const [skin3State, setSkin3State] = useState(new window.Image());
  const [skin4State, setSkin4State] = useState(new window.Image());

  const [bomb1State, setBomb1State] = useState(new window.Image());
  const [bomb2State, setBomb2State] = useState(new window.Image());
  const [bomb3State, setBomb3State] = useState(new window.Image());
  const [bomb4State, setBomb4State] = useState(new window.Image());

  const [splashState, setSplashState] = useState(new window.Image());

  const [unbreakableWallState, setUnbreakableWallState] = useState(new window.Image());
  const [twoHPwallState, setTwoHPwallState] = useState(new window.Image());
  const [oneHPwallState, setOneHPwallState] = useState(new window.Image());
  const [hitWallState, sethitWallState] = useState(new window.Image());

  const [bonus1State, setBonus1State] = useState(new window.Image());
  const [bonus2State, setBonus2State] = useState(new window.Image());
  const [bonus3State, setBonus3State] = useState(new window.Image());

  // images refs
  const skin1Ref = useRef();
  const skin2Ref = useRef();
  const skin3Ref = useRef();
  const skin4Ref = useRef();

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

  // useEffect(() => {
  //   console.log('pobeditel');
  //   if (scoreWin) {
  //     socket.on('win', (currGameState, winnerId) => {
  //       setWinner(winnerId);
  //       if (winnerId === playerId) {
  //         console.log(scoreWin);
  //         window.removeEventListener('keydown', onKeyDown);
  //         window.removeEventListener('keyup', onKeyUp);
  //         setListenKey(false);
  //         console.log('you won!');
  //       }
  //     });
  //   }
  // }, [scoreWin]);

  // player won, show stats from this currGameState
  socket.on('win', (currGameState, winnerId) => {
    setWinner(winnerId);
    if (winnerId === playerId) {
      console.log(scoreWin);
      if (scoreWin) {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
        setListenKey(false);
        console.log('you won!');
      }
    }
  });

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

  // user connected to the same room
  socket.on('userAlreadyInGame', () => {
    navigate('/main');
    console.log('you are already playing the game, leave lobby first');
  });

  useEffect(() => {
  }, [playerId, winner]);

  // on dismount
  useEffect(() => () => {
    socket.emit('disconnectNavigate', currentRoom);
    setScoreWin(true);
    window.location.reload();
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

    const bomb1Img = new window.Image();
    bomb1Img.src = bomb1;
    setBomb1State(bomb1Img);

    const bomb2Img = new window.Image();
    bomb2Img.src = bomb2;
    setBomb2State(bomb2Img);

    const bomb3Img = new window.Image();
    bomb3Img.src = bomb3;
    setBomb3State(bomb3Img);

    const bomb4Img = new window.Image();
    bomb4Img.src = bomb4;
    setBomb4State(bomb4Img);

    const splashImg = new window.Image();
    splashImg.src = splashImage;
    setSplashState(splashImg);

    const unbreakableWallImg = new window.Image();
    unbreakableWallImg.src = unbreakableWallImage;
    setUnbreakableWallState(unbreakableWallImg);

    const oneHPwallImg = new window.Image();
    oneHPwallImg.src = oneHPwallImage;
    setOneHPwallState(oneHPwallImg);

    const twoHPwallImg = new window.Image();
    twoHPwallImg.src = twoHPwallImage;
    setTwoHPwallState(twoHPwallImg);

    const hitWallImg = new window.Image();
    hitWallImg.src = hitWallImage;
    sethitWallState(hitWallImg);

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

  useEffect(() => { // main drawing
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
      <div className="absolute text-white mt-4 ml-4">
        {currRoom.map((el) => (
          <div key={el.userId}>{el.name}</div>
        ))}
      </div>
      <div className="absolute mt-32 ml-4 ">
        {gameState.gameTimer}
        <div className="mt-8 text-red-200">
          player 1:
          <div>
            life:
            {' '}
            {gameState.player1.hp}
          </div>
          <div>
            speed:
            {' '}
            {gameState.player1.bonusesTimer.speed.active ? gameState.player1.bonusesTimer.speed.timer : null}
          </div>
          <div>
            more bombs:
            {' '}
            {gameState.player1.bonusesTimer.moreBombs.active ? gameState.player1.bonusesTimer.moreBombs.timer : null}
          </div>
        </div>
        <div className="mt-8 text-green-200">
          player 2:
          <div>
            life:
            {' '}
            {gameState.player2.hp}
          </div>
          <div>
            speed:
            {' '}
            {gameState.player2.bonusesTimer.speed.active ? gameState.player2.bonusesTimer.speed.timer : null}
          </div>
          <div>
            more bombs:
            {' '}
            {gameState.player2.bonusesTimer.moreBombs.active ? gameState.player2.bonusesTimer.moreBombs.timer : null}
          </div>
        </div>
        <div className="mt-8 text-blue-200">
          player 3:
          <div>
            life:
            {' '}
            {gameState.player3.hp}
          </div>
          <div>
            speed:
            {' '}
            {gameState.player3.bonusesTimer.speed.active ? gameState.player3.bonusesTimer.speed.timer : null}
          </div>
          <div>
            more bombs:
            {' '}
            {gameState.player3.bonusesTimer.moreBombs.active ? gameState.player3.bonusesTimer.moreBombs.timer : null}
          </div>
        </div>
        <div className="mt-8 text-yellow-100">
          player 4:
          <div>
            life:
            {' '}
            {gameState.player4.hp}
          </div>
          <div>
            speed:
            {' '}
            {gameState.player4.bonusesTimer.speed.active ? gameState.player4.bonusesTimer.speed.timer : null}
          </div>
          <div>
            more bombs:
            {' '}
            {gameState.player4.bonusesTimer.moreBombs.active ? gameState.player4.bonusesTimer.moreBombs.timer : null}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center min-h-[100vh] bg-gray-700">
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
                    key={el2.id}
                  />
                )))}
              </Layer>
              <Layer>

                {walls?.map((el) => {
                  if (el.wallTimer % 10 < 5 && el.wallTimer !== 30) {
                    return (
                      <Image
                        image={hitWallState}
                        x={el.x * gridsize}
                        y={el.y * gridsize}
                        width={gameState.gridsize}
                        height={gameState.gridsize}
                        key={el.id}
                      />
                    );
                  } if (el.hp === 1) {
                    return (
                      <Image
                        image={oneHPwallState}
                        x={el.x * gridsize}
                        y={el.y * gridsize}
                        width={gameState.gridsize}
                        height={gameState.gridsize}
                        key={el.id}
                      />
                    );
                  } if (el.hp === 2) {
                    return (
                      <Image
                        image={twoHPwallState}
                        x={el.x * gridsize}
                        y={el.y * gridsize}
                        width={gameState.gridsize}
                        height={gameState.gridsize}
                        key={el.id}
                      />
                    );
                  } if (el.hp === 'infinity') {
                    return (
                      <Image
                        image={unbreakableWallState}
                        x={el.x * gridsize}
                        y={el.y * gridsize}
                        width={gameState.gridsize}
                        height={gameState.gridsize}
                        key={el.id}
                      />
                    );
                  }
                })}

              </Layer>
              <Layer>
                {bombs?.map((el) => {
                  if (el.timer <= 120 && el.timer > 90) {
                    return (
                      <Image
                        image={bomb1State}
                        x={el.x * gridsize}
                        y={el.y * gridsize}
                        width={gameState.gridsize}
                        height={gameState.gridsize}
                        key={el.id}
                      />
                    );
                  } if (el.timer <= 90 && el.timer > 60) {
                    return (
                      <Image
                        image={bomb2State}
                        x={el.x * gridsize}
                        y={el.y * gridsize}
                        width={gameState.gridsize}
                        height={gameState.gridsize}
                        key={el.id}
                      />
                    );
                  } if (el.timer <= 60 && el.timer > 30) {
                    return (
                      <Image
                        image={bomb3State}
                        x={el.x * gridsize}
                        y={el.y * gridsize}
                        width={gameState.gridsize}
                        height={gameState.gridsize}
                        key={el.id}
                      />
                    );
                  } if (el.timer <= 30) {
                    return (
                      <Image
                        image={bomb4State}
                        x={el.x * gridsize}
                        y={el.y * gridsize}
                        width={gameState.gridsize}
                        height={gameState.gridsize}
                        key={el.id}
                      />
                    );
                  }
                })}
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
                        key={el.id}
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
                        key={el.id}
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
                      key={el.id}
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
