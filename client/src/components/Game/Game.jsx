import '../../index.css';
import React, {
  useRef, useEffect, memo, useState, useLayoutEffect, useMemo,
} from 'react';

import {
  Image, Layer, Stage, Text,
} from 'react-konva';

import sf from 'seconds-formater';

import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router';

import characterSkin1 from '../../assets/images/skins/pipo-nekonin001.png';
import characterSkin2 from '../../assets/images/skins/pipo-nekonin002.png';
import characterSkin3 from '../../assets/images/skins/pipo-nekonin003.png';
import characterSkin4 from '../../assets/images/skins/pipo-nekonin004.png';
import characterSkin5 from '../../assets/images/skins/pipo-nekonin005.png';
import characterSkin6 from '../../assets/images/skins/pipo-nekonin006.png';
import characterSkin7 from '../../assets/images/skins/pipo-nekonin007.png';
import characterSkin8 from '../../assets/images/skins/pipo-nekonin008.png';
import characterSkin9 from '../../assets/images/skins/pipo-nekonin009.png';
import characterSkin10 from '../../assets/images/skins/pipo-nekonin010.png';
import characterSkin11 from '../../assets/images/skins/pipo-nekonin011.png';
import characterSkin12 from '../../assets/images/skins/pipo-nekonin012.png';
import characterSkin13 from '../../assets/images/skins/pipo-nekonin013.png';
import characterSkin14 from '../../assets/images/skins/pipo-nekonin014.png';
import characterSkin15 from '../../assets/images/skins/pipo-nekonin015.png';
import characterSkin16 from '../../assets/images/skins/pipo-nekonin016.png';
import characterSkin17 from '../../assets/images/skins/pipo-nekonin017.png';
import characterSkin18 from '../../assets/images/skins/pipo-nekonin018.png';
import characterSkin19 from '../../assets/images/skins/pipo-nekonin019.png';
import characterSkin20 from '../../assets/images/skins/pipo-nekonin020.png';
import characterSkin21 from '../../assets/images/skins/pipo-nekonin021.png';
import characterSkin22 from '../../assets/images/skins/pipo-nekonin022.png';
import characterSkin23 from '../../assets/images/skins/pipo-nekonin023.png';
import characterSkin24 from '../../assets/images/skins/pipo-nekonin024.png';
import characterSkin25 from '../../assets/images/skins/pipo-nekonin025.png';
import characterSkin26 from '../../assets/images/skins/pipo-nekonin026.png';
import characterSkin27 from '../../assets/images/skins/pipo-nekonin027.png';
import characterSkin28 from '../../assets/images/skins/pipo-nekonin028.png';
import characterSkin29 from '../../assets/images/skins/pipo-nekonin029.png';
import characterSkin30 from '../../assets/images/skins/pipo-nekonin030.png';
import characterSkin31 from '../../assets/images/skins/pipo-nekonin031.png';

import bomb1 from '../../assets/images/bomb/bomb1.png';
import bomb2 from '../../assets/images/bomb/bomb2.png';
import bomb3 from '../../assets/images/bomb/bomb3.png';
import bomb4 from '../../assets/images/bomb/bomb4.png';
import splashImage from '../../assets/images/splash/splash2.png';

import { getCurrRoomAC, getCurrRoom, getRoomsAC } from '../../redux/actions/roomsAction';
import unbreakableWallImage from '../../assets/images/walls/hard2.png';
import oneHPwallImage from '../../assets/images/walls/soft1.png';
import twoHPwallImage from '../../assets/images/walls/hard1.png';
import hitWallImage from '../../assets/images/walls/wallhit1.png';
import bonusImage1 from '../../assets/images/bonuses/bonus3.png';
import bonusImage2 from '../../assets/images/bonuses/bonus2.png';
import bonusImage4 from '../../assets/images/bonuses/bonus1.png';
import bonusImage3 from '../../assets/images/bonuses/bonus4.png';

import { sendStatistics, showStatistic } from '../../utils';
import FirstPlayerInfo from '../playersInfo/FirstPlayerInfo/FirstPlayerInfo';
import SecondPlayerInfo from '../playersInfo/SecondPlayerInfo/SecondPlayerInfo';
import ThirdPlayerInfo from '../playersInfo/ThirdPlayerInfo/ThirdPlayerInfo';
import FourthPlayerInfo from '../playersInfo/FourthPlayerInfo/FourthPlayerInfo';

function Game({
  socket, listenKey, setListenKey, currRoomId,
}) {
  // store data
  const gameState = useSelector((store) => store.gameState);

  const currRoom = useSelector((store) => store.currRoom);
  const user = useSelector((store) => store.user);

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

  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState();

  // room nicknames state
  const [roomNicknames, setRoomNicknames] = useState([]);

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
  const [bonus4State, setBonus4State] = useState(new window.Image());

  // images refs
  const skin1Ref = useRef();
  const skin2Ref = useRef();
  const skin3Ref = useRef();
  const skin4Ref = useRef();

  // const values
  const gridsize = 32;
  const tileWidth = 23;
  const tileHeight = 17;

  const skins = {
    '/pipo-nekonin001.png': characterSkin1,
    'pipo-nekonin001.png': characterSkin1,
    'pipo-nekonin002.png': characterSkin2,
    'pipo-nekonin003.png': characterSkin3,
    'pipo-nekonin004.png': characterSkin4,
    'pipo-nekonin005.png': characterSkin5,
    'pipo-nekonin006.png': characterSkin6,
    'pipo-nekonin007.png': characterSkin7,
    'pipo-nekonin008.png': characterSkin8,
    'pipo-nekonin009.png': characterSkin9,
    'pipo-nekonin010.png': characterSkin10,
    'pipo-nekonin011.png': characterSkin11,
    'pipo-nekonin012.png': characterSkin12,
    'pipo-nekonin013.png': characterSkin13,
    'pipo-nekonin014.png': characterSkin14,
    'pipo-nekonin015.png': characterSkin15,
    'pipo-nekonin016.png': characterSkin16,
    'pipo-nekonin017.png': characterSkin17,
    'pipo-nekonin018.png': characterSkin18,
    'pipo-nekonin019.png': characterSkin19,
    'pipo-nekonin020.png': characterSkin20,
    'pipo-nekonin021.png': characterSkin21,
    'pipo-nekonin022.png': characterSkin22,
    'pipo-nekonin023.png': characterSkin23,
    'pipo-nekonin024.png': characterSkin24,
    'pipo-nekonin025.png': characterSkin25,
    'pipo-nekonin026.png': characterSkin26,
    'pipo-nekonin027.png': characterSkin27,
    'pipo-nekonin028.png': characterSkin28,
    'pipo-nekonin029.png': characterSkin29,
    'pipo-nekonin030.png': characterSkin30,
    'pipo-nekonin031.png': characterSkin31,
  };

  function exitHandle() {
    window.location.reload();
  }

  socket.on('playerId', (playerNum) => {
    console.log('in socket player id');
    console.log('playerNum', playerNum);
    setPlayerId(playerNum);
  });

  useEffect(() => {
    dispatch(getCurrRoom());

    socket.on('roomUsersNicknames', (roomUsersNicknames) => {
      // console.log(roomUsersNicknames);
      setRoomNicknames(roomUsersNicknames);
      console.log(roomNicknames);
    });

    socket.on('gameInProgress', () => {
      navigate('/main');
      console.log('this game is in progress');
    });

    socket.on('userAlreadyInGame', () => {
      navigate('/main');
      console.log('you are already playing the game, leave lobby first');
    });
  }, []);

  useEffect(() => {
    socket.on('lose', (currGameState, player) => {
      if (player === playerId) {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
        setGameEnd(true);
        setListenKey(false);
        setScoreWin(false);
        console.log('you lost D:');
        setStats(showStatistic(currGameState, playerId));
        setShowStats(true);
      }
    });

    socket.on('gameEnd', (currGameState, alivePlayer) => {
      setWinner(alivePlayer);
      if (alivePlayer === playerId) {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
        setListenKey(false);
        setScoreWin(true);
        console.log('you won! everyone is wet');
        setStats(showStatistic(currGameState, playerId));
        setShowStats(true);
        if (roomNicknames) sendStatistics(currGameState, roomNicknames);
      }
    });

    socket.on('win', (currGameState, winnerId) => {
      setWinner(winnerId);
      if (winnerId === playerId) {
        if (scoreWin) {
          window.removeEventListener('keydown', onKeyDown);
          window.removeEventListener('keyup', onKeyUp);
          setListenKey(false);
          setScoreWin(true);
          console.log('you won! evetyone has left the lobby!');
          setStats(showStatistic(currGameState, playerId));
          setShowStats(true);
          if (roomNicknames) sendStatistics(currGameState, roomNicknames);
        }
      }
    });
  }, [playerId, roomNicknames, winner]);

  // on dismount
  useEffect(() => () => {
    socket.emit('disconnectNavigate', currentRoom);
    setScoreWin(true);
    window.location.reload();
  }, []);

  useEffect(() => {
    socket.on('socketRooms', (playrRoom) => {
      dispatch(getCurrRoomAC(playrRoom));
      console.log('new user in room');
    });
  }, [currRoom]);

  useEffect(() => {
    if (roomNicknames.length === 4) { // change to 4 for 4 player !!!!!!!!!!!!!!
      const skin1 = new window.Image();
      if (skins[roomNicknames[0]?.skin]) {
        skin1.src = skins[roomNicknames[0]?.skin];
      } else {
        skin1.src = skins['/pipo-nekonin001.png'];
      }
      setSkin1State(skin1);

      const skin2 = new window.Image();
      if (skins[roomNicknames[1]?.skin]) {
        skin2.src = skins[roomNicknames[1]?.skin];
      } else {
        skin2.src = skins['/pipo-nekonin001.png'];
      }
      setSkin2State(skin2);

      const skin3 = new window.Image();
      if (skins[roomNicknames[2]?.skin]) {
        skin3.src = skins[roomNicknames[2]?.skin];
      } else {
        skin3.src = skins['/pipo-nekonin001.png'];
      }
      setSkin3State(skin3);

      const skin4 = new window.Image();
      if (skins[roomNicknames[3]?.skin]) {
        skin4.src = skins[roomNicknames[3]?.skin];
      } else {
        skin4.src = skins['/pipo-nekonin001.png'];
      }
      setSkin4State(skin4);
    }
  }, [roomNicknames]);

  useEffect(() => { // loading all images
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

    const bonus4 = new window.Image();
    bonus4.src = bonusImage4;
    setBonus4State(bonus4);

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
    <div className="playerInfo">
      {!showStats && (
        <button className="btn btn-circle absolute bg-rose-500 border-0 hover:bg-rose-700 top-0 right-0 mr-8 mt-4 z-10" type="button" onClick={exitHandle}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}
      {showStats && (
        <button className="btn btn-circle absolute bg-rose-500 border-0 hover:bg-rose-700 top-0 right-0 mr-8 mt-4 z-10 animate-bounce" type="button" onClick={exitHandle}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}
      {showStats && (
        <div className="toast mr-4">
          <div className={`alert  mb-6 ${!scoreWin ? 'bg-rose-500' : 'win'}`}>
            <div className="">
              {!scoreWin ? <span className="text-2xl z-10 w-[100px]">you lost</span> : <span className="text-2xl z-10 w-[100px]">you won</span>}
              <label htmlFor="my-modal-4" className="btn modal-button border-lg winButton">show stats</label>
            </div>
          </div>
        </div>
      )}
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold text-center mb-2 text-[#93d3c8]">
            Congratulations,
            {' '}
            {user.name}
          </h3>
          <div className="text-slate-400 mb-4 text-center">You can be proud of yourself, brave Kitty!</div>
          <div className="flex-row text-center space-y-1 text-slate-400">
            <div>
              score:
              {' '}
              {stats?.kills}
            </div>
            <div>
              time played:
              {' '}
              {sf.convert(Math.floor(stats?.timePlayed / 60)).format('MM:SS')}
            </div>
          </div>
        </label>
      </label>
      <div className="absolute mt-5 ml-8">
        {!listenKey && <button className="btn loading playerInfo bgCustom" type="button">waiting for other players</button>}
      </div>
      <div className="absolute mt-16 ml-8">
        {(!gameState.gameTimer) ? (
          <div className="mt-6 text-white">
            current room id :
            {' '}
            {currentRoom}
          </div>
        ) : null}
        {currRoom[0] && <FirstPlayerInfo currRoom={currRoom[0]} gameState={gameState} />}
        {currRoom[1] && <SecondPlayerInfo currRoom={currRoom[1]} gameState={gameState} />}
        {currRoom[2] && <ThirdPlayerInfo currRoom={currRoom[2]} gameState={gameState} />}
        {currRoom[3] && <FourthPlayerInfo currRoom={currRoom[3]} gameState={gameState} />}
        {(gameState.gameTimer) ? (
          <div className="mt-5 text-white">
            time played:
            {' '}
            {sf.convert(Math.floor(gameState?.gameTimer / 60)).format('MM:SS')}
          </div>
        ) : null}
      </div>
      <div className="flex justify-center items-center min-h-[100vh] bg-gray-700">
        {gameEnd ? <h1 className="text-black">you lost :D</h1> : null}
        <div className="min-h-[100vh] bg-gray-700">
          <div className="flex justify-center items-center pt-16">
            <Stage width={gridsize * tileWidth} height={gridsize * tileHeight} className="game-canvas rounded-xl border-[5px] border-[#2c3542]">
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
                {(roomNicknames[0]?.nickname.length <= 3)
                  ? <Text text={roomNicknames[0]?.nickname} fill="#ff3874" fontSize={10} x={gameState.player1.pos.x + 6} y={gameState.player1.pos.y - 8} opacity={0.6} fontFamily="Fredoka One" />
                  : (roomNicknames[0]?.nickname.length <= 6 && roomNicknames[0]?.nickname.length > 3)
                    ? <Text text={roomNicknames[0]?.nickname} fill="#ff3874" fontSize={10} x={gameState.player1.pos.x + 4} y={gameState.player1.pos.y - 8} opacity={0.6} fontFamily="Fredoka One" />
                    : <Text text={roomNicknames[0]?.nickname} fill="#ff3874" fontSize={10} x={gameState.player1.pos.x - 4} y={gameState.player1.pos.y - 8} opacity={0.6} fontFamily="Fredoka One" />}
                <Image
                  image={skin1State}
                  x={gameState.player1.pos.x}
                  y={gameState.player1.pos.y}
                  width={gameState.gridsize}
                  height={gameState.gridsize}
                  ref={skin1Ref}
                  visible={!!gameState.player1.hp}
                />
                {(roomNicknames[1]?.nickname.length <= 3)
                  ? <Text text={roomNicknames[1]?.nickname} fill="#00aa7f" fontSize={10} x={gameState.player2.pos.x + 6} y={gameState.player2.pos.y - 8} opacity={0.6} fontFamily="Fredoka One" />
                  : (roomNicknames[1]?.nickname.length <= 6 && roomNicknames[1]?.nickname.length > 3)
                    ? <Text text={roomNicknames[1]?.nickname} fill="#00aa7f" fontSize={10} x={gameState.player2.pos.x + 4} y={gameState.player2.pos.y - 8} opacity={0.6} fontFamily="Fredoka One" />
                    : <Text text={roomNicknames[1]?.nickname} fill="#00aa7f" fontSize={10} x={gameState.player2.pos.x - 4} y={gameState.player2.pos.y - 8} opacity={0.6} fontFamily="Fredoka One" />}
                <Image
                  image={skin2State}
                  x={gameState.player2.pos.x}
                  y={gameState.player2.pos.y}
                  width={gameState.gridsize}
                  height={gameState.gridsize}
                  ref={skin2Ref}
                  visible={!!gameState.player2.hp}
                />
                {(roomNicknames[2]?.nickname.length <= 3)
                  ? <Text text={roomNicknames[2]?.nickname} fill="#436fff" fontSize={10} x={gameState.player3.pos.x + 6} y={gameState.player3.pos.y - 8} opacity={0.6} fontFamily="Fredoka One" />
                  : (roomNicknames[2]?.nickname.length <= 6 && roomNicknames[1]?.nickname.length > 3)
                    ? <Text text={roomNicknames[2]?.nickname} fill="#436fff" fontSize={10} x={gameState.player3.pos.x + 4} y={gameState.player3.pos.y - 8} opacity={0.6} fontFamily="Fredoka One" />
                    : <Text text={roomNicknames[2]?.nickname} fill="#436fff" fontSize={10} x={gameState.player3.pos.x - 4} y={gameState.player3.pos.y - 8} opacity={0.6} fontFamily="Fredoka One" />}
                <Image
                  image={skin3State}
                  x={gameState.player3.pos.x}
                  y={gameState.player3.pos.y}
                  width={gameState.gridsize}
                  height={gameState.gridsize}
                  ref={skin3Ref}
                  visible={!!gameState.player3.hp}
                />
                {(roomNicknames[3]?.nickname.length <= 3)
                  ? <Text text={roomNicknames[3]?.nickname} fill="#8419ff" fontSize={10} x={gameState.player4.pos.x + 6} y={gameState.player4.pos.y - 8} opacity={0.6} fontFamily="Fredoka One" />
                  : (roomNicknames[3]?.nickname.length <= 6 && roomNicknames[1]?.nickname.length > 3)
                    ? <Text text={roomNicknames[3]?.nickname} fill="#8419ff" fontSize={10} x={gameState.player4.pos.x + 4} y={gameState.player4.pos.y - 8} opacity={0.6} fontFamily="Fredoka One" />
                    : <Text text={roomNicknames[3]?.nickname} fill="#8419ff" fontSize={10} x={gameState.player4.pos.x - 4} y={gameState.player4.pos.y - 8} opacity={0.6} fontFamily="Fredoka One" />}
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
                  } if (el.bonus === 'strength') {
                    return (
                      <Image
                        image={bonus4State}
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
    </div>
  );
}

export default memo(Game);
