import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../../redux/actions/userAction';

function SigIn({ setActive }) {
  const [input, setInput] = useState({});
  const error = useSelector((store) => store.error);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(input, navigate));
    setInput({});
    if (!error.error) {
      setActive();
    }
  };

  return (
    <div className="main">
      <form className="flex justify-center items-center flex-col" onSubmit={submitHandler}>
        <div className="login text-info mb-4">
          Login
        </div>
        <input
          className="input input-bordered input-warning w-full max-w-xs text-info text-center"
          value={input.name || ''}
          name="name"
          type="name"
          onChange={inputHandler}
          placeholder="Player name"
        />
        <input
          className="input input-bordered input-warning text-center text-info w-full max-w-xs mt-2"
          value={input.password || ''}
          type="password"
          name="password"
          onChange={inputHandler}
          placeholder="Password"
        />

        <button className="btn btn-primary text-info text-center mt-4" type="submit">
          Sig in
        </button>
        <div className="mt-4 text-red-400">
          {error.error}
        </div>
        {/* <div>
          {login ? (
            <div className={styles.noyLogin}>Wrong login or password</div>
          ) : <div />}
        </div> */}
      </form>
    </div>
  );
}

export default SigIn;
