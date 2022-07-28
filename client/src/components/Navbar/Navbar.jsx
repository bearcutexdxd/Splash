import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
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
      </div>
    </div>
  );
}
