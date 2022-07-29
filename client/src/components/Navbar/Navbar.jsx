import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SigIn from '../Forms/SigIn/SigIn';
import SignUp from '../Forms/SiginUp/SiginUp';
import Modal from '../Modal/Modal';

export default function Navbar() {
  const [loginActive, setLoginActive] = useState(false);
  const [siginUpActive, setSiginUpActive] = useState(false);

  return (
    <div className="navbar bg-neutral">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to="/">Splash</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          {/* <li className="mr-2"><Link to="/about">about</Link></li> */}
          <li><Link to="/about">about</Link></li>
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
