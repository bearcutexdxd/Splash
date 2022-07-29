import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../../redux/actions/userAction';

function SigIn() {
  const [input, setInput] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(input, navigate));
  };

  return (
    <div className="main">
      <form className="flex justify-center items-center flex-col" onSubmit={submitHandler}>
        <div className="login">
          Login
        </div>
        <input
          className="inputEmail text-center text-info"
          value={input.name || ''}
          name="name"
          type="name"
          onChange={inputHandler}
          placeholder="Player name"
        />
        <input
          className="inputPass text-center text-info"
          value={input.password || ''}
          type="password"
          name="password"
          onChange={inputHandler}
          placeholder="Password"
        />

        <button className="btn btn-primary text-info text-center" type="submit">
          Sig in
        </button>
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
