import React from 'react';

function About() {
  return (
    <div className="back h-screen">
      <div className="flex flex-col w-full border-opacity-50">
        <div className="grid card rounded-box place-items-center m-7 text-warning text-4xl">
          С правилами игры всё просто. Самая классная киса может быть только одна.
          Из этого следует, что остальных кис нужно просто утопить.
          <p>Для передвижения по полю используй клавиши:</p>
          <p>
            'W - вверх, 'D' - вправо,
            'S' - вниз, 'A' - влево,
          </p>
          Чтобы выкопать ямку с водой для твоих противников нажми: 'Пробел'
        </div>
      </div>
    </div>

  );
}

export default About;
