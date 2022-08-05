import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../../redux/actions/userAction';
import SigIn from '../Forms/SigIn/SigIn';
import SignUp from '../Forms/SiginUp/SiginUp';
import Modal from '../Modal/Modal';

export default function Navbar({ color }) {
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
      <div className={`navbar  text-lg ${color ? 'bg-[#113053]' : 'bg-[#714cba]'}`}>
        <div className="flex-1">
          <Link className="text-xl text-white animation" to="/main">{color ? null : 'Kitty Splash'}</Link>
        </div>
        <div className="flex-none base">
          <ul className="menu menu-horizontal p-0 ">
            <li className="mr-1">
              <Link className="bg-blend-color-dodge text-white animation" to="/">About</Link>
            </li>
            <li className="mr-1">
              <Link className="bg-blend-color-dodge text-white animation" to="/main">Home</Link>
            </li>
            {/* <li>
              <Link className="text-white animation" to="/about">Rules</Link>
            </li> */}
            {user.id ? (
              <>
                <li className="mr-1">
                  <Link className="text-white animation" to={`/personalArea/${user.id}`}>
                    {user.name}
                  </Link>
                </li>
                <li className="mr-1">
                  <button type="button" className="text-white animation" onClick={clickHandler}>
                    SignOut
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="mr-1">
                  <button type="button" className="text-white animation" onClick={() => setSigInActive(true)}>
                    SignIn
                  </button>
                </li>
                <li className="mr-1">
                  <button type="button" className="text-white animation" onClick={() => setSiginUpActive(true)}>
                    SignUp
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
