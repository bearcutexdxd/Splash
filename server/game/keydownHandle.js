function keydownHandle(key, gameState) {
  const playerPos = gameState.player.pos;
  switch (key) {
    case 'w':
      playerPos.y -= 1;
      break;
    case 'a':
      playerPos.x -= 1;
      break;
    case 's':
      playerPos.y += 1;
      break;
    case 'd':
      playerPos.x += 1;
      break;
    default:
  }
}

module.exports = { keydownHandle };
