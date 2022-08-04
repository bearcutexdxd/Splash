function checkBonusesTimer(gameStateArg) {
  const currGameState = gameStateArg;
  const bonusTimer = 600;

  // player 1

  if (currGameState.player1.bonusesTimer.strength.timer === 0) {
    currGameState.player1.strength -= 1;
    currGameState.player1.bonusesTimer.strength.timer = bonusTimer;
    currGameState.player1.bonusesTimer.strength.active = false;
  }
  if (currGameState.player1.bonusesTimer.speed.timer === 0) {
    currGameState.player1.speed -= 1;
    currGameState.player1.bonusesTimer.speed.timer = bonusTimer;
    currGameState.player1.bonusesTimer.speed.active = false;
  }
  if (currGameState.player1.bonusesTimer.moreBombs.timer === 0) {
    currGameState.player1.maxBombs -= 1;
    currGameState.player1.bonusesTimer.moreBombs.timer = bonusTimer;
    currGameState.player1.bonusesTimer.moreBombs.active = false;
  }
  if (currGameState.player1.bonusesTimer.strength.active) {
    currGameState.player1.bonusesTimer.strength.timer -= 1;
  }
  if (currGameState.player1.bonusesTimer.speed.active) {
    currGameState.player1.bonusesTimer.speed.timer -= 1;
  }
  if (currGameState.player1.bonusesTimer.moreBombs.active) {
    currGameState.player1.bonusesTimer.moreBombs.timer -= 1;
  }

  // player 2

  if (currGameState.player2.bonusesTimer.strength.timer === 0) {
    currGameState.player2.strength -= 1;
    currGameState.player2.bonusesTimer.strength.timer = bonusTimer;
    currGameState.player2.bonusesTimer.strength.active = false;
  }
  if (currGameState.player2.bonusesTimer.speed.timer === 0) {
    currGameState.player2.speed -= 1;
    currGameState.player2.bonusesTimer.speed.timer = bonusTimer;
    currGameState.player2.bonusesTimer.speed.active = false;
  }
  if (currGameState.player2.bonusesTimer.moreBombs.timer === 0) {
    currGameState.player2.maxBombs -= 1;
    currGameState.player2.bonusesTimer.moreBombs.timer = bonusTimer;
    currGameState.player2.bonusesTimer.moreBombs.active = false;
  }
  if (currGameState.player2.bonusesTimer.strength.active) {
    currGameState.player2.bonusesTimer.strength.timer -= 1;
  }
  if (currGameState.player2.bonusesTimer.speed.active) {
    currGameState.player2.bonusesTimer.speed.timer -= 1;
  }
  if (currGameState.player2.bonusesTimer.moreBombs.active) {
    currGameState.player2.bonusesTimer.moreBombs.timer -= 1;
  }

  // player 3

  if (currGameState.player3.bonusesTimer.strength.timer === 0) {
    currGameState.player3.strength -= 1;
    currGameState.player3.bonusesTimer.strength.timer = bonusTimer;
    currGameState.player3.bonusesTimer.strength.active = false;
  }
  if (currGameState.player3.bonusesTimer.speed.timer === 0) {
    currGameState.player3.speed -= 1;
    currGameState.player3.bonusesTimer.speed.timer = bonusTimer;
    currGameState.player3.bonusesTimer.speed.active = false;
  }
  if (currGameState.player3.bonusesTimer.moreBombs.timer === 0) {
    currGameState.player3.maxBombs -= 1;
    currGameState.player3.bonusesTimer.moreBombs.timer = bonusTimer;
    currGameState.player3.bonusesTimer.moreBombs.active = false;
  }
  if (currGameState.player3.bonusesTimer.strength.active) {
    currGameState.player3.bonusesTimer.strength.timer -= 1;
  }
  if (currGameState.player3.bonusesTimer.speed.active) {
    currGameState.player3.bonusesTimer.speed.timer -= 1;
  }
  if (currGameState.player3.bonusesTimer.moreBombs.active) {
    currGameState.player3.bonusesTimer.moreBombs.timer -= 1;
  }

  // player 4

  if (currGameState.player4.bonusesTimer.strength.timer === 0) {
    currGameState.player4.strength -= 1;
    currGameState.player4.bonusesTimer.strength.timer = bonusTimer;
    currGameState.player4.bonusesTimer.strength.active = false;
  }
  if (currGameState.player4.bonusesTimer.speed.timer === 0) {
    currGameState.player4.speed -= 1;
    currGameState.player4.bonusesTimer.speed.timer = bonusTimer;
    currGameState.player4.bonusesTimer.speed.active = false;
  }
  if (currGameState.player4.bonusesTimer.moreBombs.timer === 0) {
    currGameState.player4.maxBombs -= 1;
    currGameState.player4.bonusesTimer.moreBombs.timer = bonusTimer;
    currGameState.player4.bonusesTimer.moreBombs.active = false;
  }
  if (currGameState.player4.bonusesTimer.strength.active) {
    currGameState.player4.bonusesTimer.strength.timer -= 1;
  }
  if (currGameState.player4.bonusesTimer.speed.active) {
    currGameState.player4.bonusesTimer.speed.timer -= 1;
  }
  if (currGameState.player4.bonusesTimer.moreBombs.active) {
    currGameState.player4.bonusesTimer.moreBombs.timer -= 1;
  }

  return currGameState;
}

module.exports = { checkBonusesTimer };
