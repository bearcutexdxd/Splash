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
          sign in
        </div>
        <input
          className="input input-bordered input-warning w-full max-w-xs text-info text-center"
          value={input.name || ''}
          name="name"
          type="name"
          onChange={inputHandler}
          placeholder="nickname"
        />
        <input
          className="input input-bordered input-warning text-center text-info w-full max-w-xs mt-4"
          value={input.password || ''}
          type="password"
          name="password"
          onChange={inputHandler}
          placeholder="password"
        />

        <button className="btn btn-info text-white text-center mt-4" type="submit">
          sign in
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
