import React from 'react';
import speed from '../../../assets/images/bonuses/bonus3.png';
import strength from '../../../assets/images/bonuses/bonus1.png';
import moreBombs from '../../../assets/images/bonuses/bonus4.png';
import ProgressBar from '../../ProgressBar/ProgressBar';

export default function FourthPlayerInfo({ currRoom, gameState }) {
  return (
    <div className="mt-8 text-purple-300 text-3xl playerInfo">
      {currRoom.name}
      <div className="text-lg mt-4">
        score:
        {' '}
        {gameState.player4.statistics.kills}
      </div>
      <div className="text-lg">
        hp:
        {' '}
        {gameState.player4.hp}
      </div>
      <div className="flex space-x-2 mt-2">
        {gameState.player4.bonusesTimer.speed.active ? <ProgressBar image={speed} percentage={(gameState.player4.bonusesTimer.speed.timer / 1200).toFixed(2) * 100} /> : null}
        {gameState.player4.bonusesTimer.moreBombs.active ? <ProgressBar image={moreBombs} percentage={(gameState.player4.bonusesTimer.moreBombs.timer / 1200).toFixed(2) * 100} /> : null}
        {gameState.player4.bonusesTimer.strength.active ? <ProgressBar image={strength} percentage={(gameState.player4.bonusesTimer.strength.timer / 1200).toFixed(2) * 100} /> : null}
      </div>
    </div>

  );
}
