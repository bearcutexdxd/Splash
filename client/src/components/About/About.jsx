import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import Navbar from '../Navbar/Navbar';

function About() {
  return (
    <>
      <Navbar />
      <div className="back h-screen" id="about">
        <div className="flex flex-col w-full border-opacity-50">
          <div className="grid card rounded-box place-items-center m-7 text-warning text-2xl">
            <span>
              <Typewriter
                cursor
                cursorStyle="_"
                typeSpeed={30}
                deleteSpeed={50}
                delaySpeed={1000000}
                words={['С правилами игры всё просто. \nСамая классная киса может быть только одна. Из этого следует, что остальных кис нужно просто утопить.\n Для передвижения по полю используй клавиши:\n "W" - вверх, "D" - вправо, "S" - вниз, "A" - влево. Чтобы выкопать ямку с водой для твоих противников нажми: "Пробел"']}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
