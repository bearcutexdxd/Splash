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
        if (currGameState.player1.invulnerability.active === false) {
          currGameState.player1.invulnerability.active = true;
          currGameState.player1.hp -= 1;
          if (splash[i].owner !== 1) {
            currGameState.player1.lastDamageFrom = splash[i].owner;
          }
        }
      }
      if (Math.round(player2Pos.x / gridsize) === splash[i].pos[j].x
        && Math.round(player2Pos.y / gridsize) === splash[i].pos[j].y) {
        if (currGameState.player2.invulnerability.active === false) {
          currGameState.player2.invulnerability.active = true;
          currGameState.player2.hp -= 1;
          if (splash[i].owner !== 2) {
            currGameState.player2.lastDamageFrom = splash[i].owner;
          }
        }
      }
      if (Math.round(player3Pos.x / gridsize) === splash[i].pos[j].x
        && Math.round(player3Pos.y / gridsize) === splash[i].pos[j].y) {
        if (currGameState.player3.invulnerability.active === false) {
          currGameState.player3.invulnerability.active = true;
          currGameState.player3.hp -= 1;
          if (splash[i].owner !== 3) {
            currGameState.player3.lastDamageFrom = splash[i].owner;
          }
        }
      }
      if (Math.round(player4Pos.x / gridsize) === splash[i].pos[j].x
        && Math.round(player4Pos.y / gridsize) === splash[i].pos[j].y) {
        if (currGameState.player4.invulnerability.active === false) {
          currGameState.player4.invulnerability.active = true;
          currGameState.player4.hp -= 1;
          if (splash[i].owner !== 4) {
            currGameState.player4.lastDamageFrom = splash[i].owner;
          }
        }
      }
    }
  }

  return currGameState;
}

module.exports = {
  checkIsPlayerHit,
};
