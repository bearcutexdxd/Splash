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
    console.log('!!!sig', userSignUp);
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
          User Sign Up
        </legend>

        <input
          onChange={changeHandler}
          className="input input-bordered input-warning w-full max-w-xs text-info text-center"
          value={userSignUp.playerName}
          type="text"
          name="playerName"
          placeholder="Name"
        />

        <input
          onChange={changeHandler}
          className="input input-bordered input-warning w-full max-w-xs text-info text-center mt-2"
          value={userSignUp.password}
          type="password"
          name="password"
          placeholder="Pass"
        />
        <button type="submit" className="btn btn-primary text-info text-center mt-4">
          Sign Up
        </button>
        <div className="mt-4 text-red-400">
          {error.error}
        </div>
      </form>
    </div>
  );
}
export default SignUp;
