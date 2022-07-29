import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SigIn from '../Forms/SigIn/SigIn';
import SignUp from '../Forms/SiginUp/SiginUp';
import Modal from '../Modal/Modal';

export default function Navbar() {
  const [loginActive, setLoginActive] = useState(false);
  const [siginUpActive, setSiginUpActive] = useState(false);

  return (
    <>
      <div className="navbar bg-primary ">
        <div className="flex-1">
          <Link className="text-xl text-white animation" to="/">Splash</Link>
        </div>
        <div className="flex-none base">
          <ul className="menu menu-horizontal p-0 ">
            <li className="mr-2">
              <Link className="bg-blend-color-dodge text-white animation" to="/">Main</Link>
            </li>
            <li>
              <Link className="text-white animation" to="/about">About</Link>
            </li>
            <li>
              <button type="button" className="text-white animation" onClick={() => setLoginActive(true)}>SigIn</button>
            </li>
            <li>
              <button type="button" className="text-white animation" onClick={() => setSiginUpActive(true)}>SiginUp</button>
            </li>
          </ul>

        </div>
      </div>
      <Modal active={loginActive} setActive={setLoginActive}>
        <SigIn />
      </Modal>
      <Modal active={siginUpActive} setActive={setSiginUpActive}>
        <SignUp />
      </Modal>
    </>

  );
}
