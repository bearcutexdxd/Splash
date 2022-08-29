import React from 'react';
import ProgressBar from '../../ProgressBar/ProgressBar';
import speed from '../../../assets/images/bonuses/bonus3.png';
import strength from '../../../assets/images/bonuses/bonus1.png';
import moreBombs from '../../../assets/images/bonuses/bonus4.png';

export default function SecondPlayerInfo({ currRoom, gameState }) {
  return (
    <div className="mt-8 text-green-200 text-3xl playerInfo">
      {currRoom.name}
      <div className="text-lg mt-4">
        score:
        {' '}
        {gameState.player2.statistics.kills}
      </div>
      <div className="text-lg">
        hp:
        {' '}
        {gameState.player2.hp}
      </div>
      <div className="flex space-x-2 mt-2">
        {gameState.player2.bonusesTimer.speed.active ? <ProgressBar image={speed} percentage={(gameState.player2.bonusesTimer.speed.timer / 1200).toFixed(2) * 100} /> : null}
        {gameState.player2.bonusesTimer.moreBombs.active ? <ProgressBar image={moreBombs} percentage={(gameState.player2.bonusesTimer.moreBombs.timer / 1200).toFixed(2) * 100} /> : null}
        {gameState.player2.bonusesTimer.strength.active ? <ProgressBar image={strength} percentage={(gameState.player2.bonusesTimer.strength.timer / 1200).toFixed(2) * 100} /> : null}
      </div>
    </div>

  );
}
