function checkCollision(gameStateArg, positionArg) {
  const currGameState = gameStateArg;
  let check = true;
  const position = {
    x: Math.round(positionArg.x / currGameState.gridsize),
    y: Math.round(positionArg.y / currGameState.gridsize),
  };

  console.log(position);
  currGameState.walls.forEach((el) => {
    if (el.x === position.x && el.y === position.y) {
      check = false;
    }
  });

  return check;
}

module.exports = { checkCollision };
