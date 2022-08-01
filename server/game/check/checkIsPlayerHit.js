/* eslint-disable no-param-reassign */
function checkIsPlayerHit(currGameState) {
  const player1Pos = currGameState.player1.pos;
  const player2Pos = currGameState.player2.pos;
  const player3Pos = currGameState.player3.pos;
  const player4Pos = currGameState.player4.pos;
  const { splash } = currGameState;
  const { gridsize } = currGameState;

  for (let i = 0; i < currGameState.splash.length; i += 1) {
    for (let j = 0; j < splash[i].pos.length; j += 1) {
      if (Math.round(player1Pos.x / gridsize) === splash[i].pos[j].x
        && Math.round(player1Pos.y / gridsize) === splash[i].pos[j].y) {
        currGameState.player1.hp = 0;
      }
      if (Math.round(player2Pos.x / gridsize) === splash[i].pos[j].x
        && Math.round(player2Pos.y / gridsize) === splash[i].pos[j].y) {
        currGameState.player2.hp = 0;
      }
      if (Math.round(player3Pos.x / gridsize) === splash[i].pos[j].x
        && Math.round(player3Pos.y / gridsize) === splash[i].pos[j].y) {
        currGameState.player3.hp = 0;
      }
      if (Math.round(player4Pos.x / gridsize) === splash[i].pos[j].x
        && Math.round(player4Pos.y / gridsize) === splash[i].pos[j].y) {
        currGameState.player4.hp = 0;
      }
    }
  }

  return currGameState;
}

module.exports = {
  checkIsPlayerHit,
};
