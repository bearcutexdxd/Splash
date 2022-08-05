import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../../redux/actions/userAction';

function SignUp({ setActive }) {
  const [userSignUp, setUserSignUp] = useState({
    password: '',
    playerName: '',
  });

  const navigate = useNavigate();
  const error = useSelector((store) => store.error);

  const changeHandler = (e) => {
    setUserSignUp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signUp(userSignUp, navigate));
    setUserSignUp({});
    if (!error.error) {
      setActive();
    }
  };

  return (
    <div className="main">
      <form onSubmit={submitHandler} className="min-w-300 form flex justify-center items-center flex-col">
        <legend className="text-center mb-4 text-info">
          sign up
        </legend>

        <input
          onChange={changeHandler}
          className="input input-bordered input-warning w-full max-w-xs text-info text-center"
          value={userSignUp.playerName}
          type="text"
          name="playerName"
          placeholder="nickname"
        />
        <input
          onChange={changeHandler}
          className="input input-bordered input-warning w-full max-w-xs text-info text-center mt-4"
          value={userSignUp.password}
          type="password"
          name="password"
          placeholder="password"
        />
        <button type="submit" className="btn btn-info text-white text-center mt-4">
          sign up
        </button>
        <div className="mt-4 text-red-400">
          {error.error}
        </div>
      </form>
    </div>
  );
}
export default SignUp;
