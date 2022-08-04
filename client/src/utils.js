import * as endPoints from './config/endPoints';

export default async function sendStatistics(gameState, roomNicknames) {
  console.log('sending statistics');
  const response = await fetch(endPoints.sendStats(), {
    method: 'patch',
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
