import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../../redux/actions/userAction';

function SignUp() {
  const [userSignUp, setUserSignUp] = useState({
    password: '',
    playerName: '',
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setUserSignUp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log('!!!sig', userSignUp);
    dispatch(signUp(userSignUp, navigate));
    setUserSignUp({});
  };

  return (
    <div className="main ">
      <form onSubmit={submitHandler} className="form flex justify-center items-center flex-col">
        <legend className="text-center mb-4 text-info">
          User Sign Up
        </legend>

        <input
          onChange={changeHandler}
          className="inpyt text-info text-center"
          value={userSignUp.playerName}
          type="text"
          name="playerName"
          placeholder="Name"
        />

        <input
          onChange={changeHandler}
          className="form-control text-info text-center"
          value={userSignUp.password}
          type="password"
          name="password"
          placeholder="Pass"
        />
        <button type="submit" className="btn btn-primary text-info text-center">
          Sign Up
        </button>
      </form>
    </div>
  );
}
export default SignUp;
