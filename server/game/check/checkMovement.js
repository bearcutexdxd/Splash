function checkMovement(gameState, playerNum) {
  if ((gameState.player1.movement.down || gameState.player1.movement.up || gameState.player1.movement.left || gameState.player1.movement.right) && playerNum === '1') {
    return true;
  }
  if ((gameState.player2.movement.down || gameState.player2.movement.up || gameState.player2.movement.left || gameState.player2.movement.right) && playerNum === '2') {
    return true;
  }
  if ((gameState.player3.movement.down || gameState.player3.movement.up || gameState.player3.movement.left || gameState.player3.movement.right) && playerNum === '3') {
    return true;
  }
  if ((gameState.player4.movement.down || gameState.player4.movement.up || gameState.player4.movement.left || gameState.player4.movement.right) && playerNum === '4') {
    return true;
  }
  return false;
}

module.exports = { checkMovement };
