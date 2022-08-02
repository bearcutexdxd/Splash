import React from 'react';

function Skin(name) {
  return (
    <div className="card m-4 shop">
      <img src="https://cdn.discordapp.com/attachments/997270158362034308/1003587155173593138/simpleguy_kitty_splash_b37b1497-7a40-4dbe-9ac7-39d0743fc99b.png" alt="car!" />
      <div className="card-body">
        <h5 className="card-title justify-center text-success">Name of Skin</h5>
        <p className="text-info text-2xl">Уникальный скин в игре Kitty Splash, купить его можно только после 100 уничтожений кошечек или после 10 часов в игре</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary text-warning" type="button">Buy now!</button>
        </div>
      </div>
    </div>
  );
}

export default Skin;
