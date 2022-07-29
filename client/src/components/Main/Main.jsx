import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-2xl mt-12">you will Splash this final project!</h1>
      </div>
      <div className="flex justify-center items-center">
        <button className="btn btn-success mt-4" type="button">
          <Link to="/game">play</Link>
        </button>
      </div>
    </>
  );
}

export default Main;
