import * as endPoints from './config/endPoints';

async function sendStatistics(gameState, roomNicknames) {
  console.log('sending statistics');
  const response = await fetch(endPoints.sendStats(), {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ gameState, roomNicknames }),
  });
  if (response.ok) {
    console.log('DB updated');
  }
  // if (response.status === 200) {
  //   const user = await response.json();
  //   navigate('/');
  // } else {
  //   navigate('/auth/signin');
  // }
}

function showStatistic(currGameState, playerId) {
  let currPlayer;

  switch (playerId) {
    case 1:
      currPlayer = currGameState.player1;
      break;
    case 2:
      currPlayer = currGameState.player2;
      break;
    case 3:
      currPlayer = currGameState.player3;
      break;
    case 4:
      currPlayer = currGameState.player4;
      break;
    default:
      break;
  }

  return currPlayer.statistics;
}

export { sendStatistics, showStatistic };
