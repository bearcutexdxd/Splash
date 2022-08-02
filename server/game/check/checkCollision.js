function checkCollision(gameStateArg, positionArg, playerId) {
  const currGameState = gameStateArg;
  let check = true;
  const position = {
    x: Math.round(positionArg.x / currGameState.gridsize),
    y: Math.round(positionArg.y / currGameState.gridsize),
  };

  currGameState.walls.forEach((el) => {
    if (el.x === position.x && el.y === position.y) {
      check = false;
    }
  });

  currGameState.boundaries.forEach((el) => {
    if (el.x === position.x && el.y === position.y) {
      check = false;
    }
  });

  currGameState.bombs.forEach((el) => {
    if (playerId === el.owner) {
      if (el.x === position.x && el.y === position.y && el.isSolid === true) {
        check = false;
      }
    } else if (el.x === position.x && el.y === position.y) {
      check = false;
    }
  });

  return check;
}

module.exports = { checkCollision };
