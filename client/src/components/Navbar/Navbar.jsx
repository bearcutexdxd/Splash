import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../../redux/actions/userAction';
import SigIn from '../Forms/SigIn/SigIn';
import SignUp from '../Forms/SiginUp/SiginUp';
import Modal from '../Modal/Modal';

export default function Navbar() {
  const [sigInActive, setSigInActive] = useState(false);
  const [siginUpActive, setSiginUpActive] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const clickHandler = (e) => {
    e.preventDefault();
    dispatch(signOut());
  };

  return (
    <>
      <div className="navbar bg-[#714cba] text-lg">
        <div className="flex-1">
          <Link className="text-xl text-white animation" to="/">Kitty Splash</Link>
        </div>
        <div className="flex-none base">
          <ul className="menu menu-horizontal p-0 ">
            <li className="mr-2">
              <Link className="bg-blend-color-dodge text-white animation" to="/">About</Link>
            </li>
            <li className="mr-2">
              <Link className="bg-blend-color-dodge text-white animation" to="/main">Main</Link>
            </li>
            <li>
              <Link className="text-white animation" to="/about">About</Link>
            </li>
            {user.id ? (
              <>
                <li>
                  <Link className="text-white animation" to={`/personalArea/${user.id}`}>
                    {user.name}
                  </Link>
                </li>
                <li>
                  <button type="button" className="text-white animation" onClick={clickHandler}>
                    SignOut
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button type="button" className="text-white animation" onClick={() => setSigInActive(true)}>
                    SigIn
                  </button>
                </li>
                <li>
                  <button type="button" className="text-white animation" onClick={() => setSiginUpActive(true)}>
                    SiginUp
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Modal active={sigInActive} setActive={setSigInActive}>
        <SigIn setActive={setSigInActive} />
      </Modal>
      <Modal active={siginUpActive} setActive={setSiginUpActive}>
        <SignUp setActive={setSiginUpActive} />
      </Modal>
    </>

  );
}
