function deleteWalls(gameStateArg) {
  const currGameState = gameStateArg;

  currGameState.walls = currGameState.walls.filter((el) => el.timer !== 0);
  return currGameState;
}

module.exports = { deleteWalls };
