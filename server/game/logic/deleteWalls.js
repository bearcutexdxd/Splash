function deleteWalls(gameStateArg) {
  const currGameState = gameStateArg;

  currGameState.walls = currGameState.walls.filter((el) => el.wallTimer !== 0);
  return currGameState;
}

module.exports = { deleteWalls };
