function checkTakeBonus(gameStateArg) {
  const currGameState = gameStateArg;

  const addHP = 1;
  const bonusesTimer = 600;

  const x1 = Math.round(currGameState.player1.pos.x / currGameState.gridsize);
  const y1 = Math.round((currGameState.player1.pos.y) / currGameState.gridsize);

  const x2 = Math.round(currGameState.player2.pos.x / currGameState.gridsize);
  const y2 = Math.round((currGameState.player2.pos.y) / currGameState.gridsize);

  const x3 = Math.round(currGameState.player3.pos.x / currGameState.gridsize);
  const y3 = Math.round((currGameState.player3.pos.y) / currGameState.gridsize);

  const x4 = Math.round(currGameState.player4.pos.x / currGameState.gridsize);
  const y4 = Math.round((currGameState.player4.pos.y) / currGameState.gridsize);

  currGameState.bonuses.forEach((el, index) => {
    // first character

    if (x1 === el.x && y1 === el.y) {
      if (el.bonus === 'strength') {
        if (currGameState.player1.strength !== 2) {
          currGameState.player1.strength += 1;
          currGameState.player1.bonusesTimer.strength.active = true;
        } else {
          currGameState.player1.bonusesTimer.strength.timer = bonusesTimer;
        }
      }
      if (el.bonus === 'life' && currGameState.player1.hp !== 2) {
        currGameState.player1.hp += addHP;
      }
      if (el.bonus === 'speed') {
        if (currGameState.player1.speed !== 2) {
          currGameState.player1.speed += 1;
          currGameState.player1.bonusesTimer.speed.active = true;
        } else {
          currGameState.player1.bonusesTimer.speed.timer = bonusesTimer;
        }
      }
      if (el.bonus === 'moreBombs') {
        if (currGameState.player1.maxBombs !== 2) {
          currGameState.player1.maxBombs += 1;
          currGameState.player1.bonusesTimer.moreBombs.active = true;
        } else {
          currGameState.player1.bonusesTimer.moreBombs.timer = bonusesTimer;
        }
      }
      currGameState.bonuses.splice(index, 1);
    }

    // second character

    if (x2 === el.x && y2 === el.y) {
      if (el.bonus === 'strength') {
        if (currGameState.player2.strength !== 2) {
          currGameState.player2.strength += 1;
          currGameState.player2.bonusesTimer.strength.active = true;
        } else {
          currGameState.player2.bonusesTimer.strength.timer = bonusesTimer;
        }
      }
      if (el.bonus === 'life' && currGameState.player2.hp !== 2) {
        currGameState.player2.hp += addHP;
      }
      if (el.bonus === 'speed') {
        if (currGameState.player2.speed !== 2) {
          currGameState.player2.speed += 1;
          currGameState.player2.bonusesTimer.speed.active = true;
        } else {
          currGameState.player2.bonusesTimer.speed.timer = bonusesTimer;
        }
      }
      if (el.bonus === 'moreBombs') {
        if (currGameState.player2.maxBombs !== 2) {
          currGameState.player2.maxBombs += 1;
          currGameState.player2.bonusesTimer.moreBombs.active = true;
        } else {
          currGameState.player2.bonusesTimer.moreBombs.timer = bonusesTimer;
        }
      }
      currGameState.bonuses.splice(index, 1);
    }

    // third character

    if (x3 === el.x && y3 === el.y) {
      if (el.bonus === 'strength') {
        if (currGameState.player3.strength !== 2) {
          currGameState.player3.strength += 1;
          currGameState.player3.bonusesTimer.strength.active = true;
        } else {
          currGameState.player3.bonusesTimer.strength.timer = bonusesTimer;
        }
      }
      if (el.bonus === 'life' && currGameState.player3.hp !== 2) {
        currGameState.player3.hp += addHP;
      }
      if (el.bonus === 'speed') {
        if (currGameState.player3.speed !== 2) {
          currGameState.player3.speed += 1;
          currGameState.player3.bonusesTimer.speed.active = true;
        } else {
          currGameState.player3.bonusesTimer.speed.timer = bonusesTimer;
        }
      }
      if (el.bonus === 'moreBombs') {
        if (currGameState.player3.maxBombs !== 2) {
          currGameState.player3.maxBombs += 1;
          currGameState.player3.bonusesTimer.moreBombs.active = true;
        } else {
          currGameState.player3.bonusesTimer.moreBombs.timer = bonusesTimer;
        }
      }
      currGameState.bonuses.splice(index, 1);
    }

    // fourth player

    if (x4 === el.x && y4 === el.y) {
      if (el.bonus === 'strength') {
        if (currGameState.player4.strength !== 2) {
          currGameState.player4.strength += 1;
          currGameState.player4.bonusesTimer.strength.active = true;
        } else {
          currGameState.player4.bonusesTimer.strength.timer = bonusesTimer;
        }
      }
      if (el.bonus === 'life' && currGameState.player4.hp !== 2) {
        currGameState.player4.hp += addHP;
      }
      if (el.bonus === 'speed') {
        if (currGameState.player4.speed !== 2) {
          currGameState.player4.speed += 1;
          currGameState.player4.bonusesTimer.speed.active = true;
        } else {
          currGameState.player4.bonusesTimer.speed.timer = bonusesTimer;
        }
      }
      if (el.bonus === 'moreBombs') {
        if (currGameState.player4.maxBombs !== 2) {
          currGameState.player4.maxBombs += 1;
          currGameState.player4.bonusesTimer.moreBombs.active = true;
        } else {
          currGameState.player4.bonusesTimer.moreBombs.timer = bonusesTimer;
        }
      }
      currGameState.bonuses.splice(index, 1);
    }
  });

  return currGameState;
}

module.exports = { checkTakeBonus };
