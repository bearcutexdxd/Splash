import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SigIn from '../Forms/SigIn/SigIn';
import SignUp from '../Forms/SiginUp/SiginUp';
import Modal from '../Modal/Modal';

export default function Navbar() {
  const [loginActive, setLoginActive] = useState(false);
  const [siginUpActive, setSiginUpActive] = useState(false);

  return (
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
            <Link className="text-white animation" to="/Registr">Registration</Link>
          </li>
          <li>
            <Link className="text-white animation" to="/auth">Sign up</Link>
          </li>
        </ul>
        <button type="button" className="loginButton" onClick={() => setLoginActive(true)}>SigIn</button>
        <button type="button" className="signButton" onClick={() => setSiginUpActive(true)}>SiginUp</button>
      </div>
      <Modal active={loginActive} setActive={setLoginActive}>
        <SigIn />
      </Modal>
      <Modal active={siginUpActive} setActive={setSiginUpActive}>
        <SignUp />
      </Modal>
    </div>
  );
}
