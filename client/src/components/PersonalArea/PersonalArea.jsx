import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hostFrontSkin } from '../../config/endPoints';
import { getUserSkinsThunk, putSkinUserThunk } from '../../redux/actions/skinsAction';
import { getStats } from '../../redux/actions/statisticsAction';
import { checkAuth } from '../../redux/actions/userAction';
import Modal from '../Modal/Modal';
import Navbar from '../Navbar/Navbar';

function PersonalArea() {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('dispatch');
    dispatch(getStats(user.id));
    dispatch(getUserSkinsThunk(user.id));
  }, []);

  function SkinIdHandler(img) {
    dispatch(putSkinUserThunk(user, img));
    console.log('pull user');
  }
  const user = useSelector((store) => store.user);
  console.log('user', user);
  const userSkins = useSelector((store) => store.stats);
  const stats = useSelector((store) => store.stats);
  const { Skins: skins } = useSelector((store) => store.userSkins);
  console.log(skins);
  return (
    <>
      <Navbar />
      <div className="flex items-center flex-row main">
        <div className="div ">
          <button className="m-auto" type="button" onClick={() => setActive(true)}>
            <img className="catScin" src={`${hostFrontSkin()}${user.skin}`} alt="BEST" />
          </button>
        </div>
        <div className="div">
          <h2>Statistics</h2>
          {stats?.map((el) => (
            <ul key={el.id}>
              <li>{`Kills ${el.kills}`}</li>
              <li>{`Deaths ${el.deaths}`}</li>
              <li>{`loses ${el.loses}`}</li>
              <li>{`Wins ${el.wins}`}</li>
            </ul>
          ))}
        </div>
      </div>
      <Modal active={active} setActive={setActive}>
        <div className="grid grid-cols-6 overflow-scroll">
          {skins?.map((el) => (
            <button type="button" onClick={() => { SkinIdHandler(el.img); }}>
              <div key={el.id} className="card m-4 skinImg">
                <h5 className="card-title justify-center text-success text-base">{el.name}</h5>
                <img className="skinImg" src={`${hostFrontSkin()}${el.img}`} alt="BEST" />
              </div>
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}

export default PersonalArea;
