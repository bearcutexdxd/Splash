import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import Navbar from '../Navbar/Navbar';
import ava from '../../assets/images/picture/simpleguy_kitty_splash_08c8b024-4a62-4acb-ad3d-a5dcfeeb0e16.png';

function Home() {
  return (
    <>
      <Navbar color="#0f2b4b" />
      <div className="flex flex-col justify-center items-center backhead" id="home">
        <div className="absolute right-72 top-32 text-7xl">
          <h1>Kitty Splash</h1>
        </div>
        <span className="text-2xl text-warning absolute right-32 w-4/12 top-60" id="typewritter">
          <Typewriter
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000000}
            words={['Кораблекрушение. Остров. Окружены водой. Став заложниками такой  непростой ситуации - что же придумали кошечки, чтобы помочь друг другу преодолеть свои страхи?']}
          />
        </span>
      </div>
    </>
  );
}

export default Home;
