import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
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
      </div>
    </div>
  );
}
