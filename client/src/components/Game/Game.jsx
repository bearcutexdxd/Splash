import React, {
  useRef, useEffect, memo, useMemo,
  useCallback,
  useState,
} from 'react';

const BG_COLOR = '#ffffff';
const PLAYER_COLOR = '#fa8072';

function Game({ gameState, socket }) {
  const canvasRef = useRef();

  const draw = useCallback((ctx, canvas, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  const drawPlayer = (ctx, color, size, playerPos) => {
    ctx.fillStyle = color;
    ctx.fillRect(playerPos.x * size, playerPos.y * size, size, size);
  };

  useEffect(() => { // event listener
    window.addEventListener('keydown', (e) => {
      socket.emit('keydown', e.key);
    });
  }, []);

  useEffect(() => { // drawing on canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    const { gridsize } = gameState;
    const size = canvas.width / gridsize;
    const playerPos = gameState.player.pos;

    draw(ctx, canvas, BG_COLOR);

    if (playerPos) drawPlayer(ctx, PLAYER_COLOR, size, playerPos);
  }, [gameState]);

  return (
    <div className="flex justify-center items-center mt-12">
      <canvas ref={canvasRef} className="game-canvas" />
    </div>
  );
}

export default memo(Game);
