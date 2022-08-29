import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sf from 'seconds-formater';
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
    setActive(false);
  }
  const user = useSelector((store) => store.user);
  // console.log('user', user);
  const userSkins = useSelector((store) => store.stats);
  const stats = useSelector((store) => store.stats);
  const { Skins: skins } = useSelector((store) => store.userSkins);
  console.log('skins', skins);
  // console.log(stats);
  return (
    <>
      <Navbar />
      <div className="flex items-center flex-row area text-primary bgstats">
        <div className="div">
          <button className="m-auto" type="button" onClick={() => setActive(true)}>
            <div className="text-xl">
              current skin
              <img className="catScin max-h-64 mt-8 mb-8" src={`${hostFrontSkin()}${user.skin}`} alt="BEST" />
            </div>
            <div className="text-xl">
              your balance:
            </div>
            <div className="text-sm text-[#fde68b] mt-3">
              {(user.balance) ? `${user.balance} kitcoins` : '0 kitcoins'}
            </div>
          </button>
        </div>
        <div className="div2">
          <div className="m-auto">
            <h2 className="text-5xl text-center mb-8">Statistics</h2>
            {stats?.map((el) => (
              <ul className="flex flex-col items-center text-xl space-y-4" key={el.id}>
                <li className="text-green-400">{`kills: ${el.kills}`}</li>
                <li className="text-green-400">{`wins: ${el.wins}`}</li>
                <li className="text-red-500">{`deaths: ${el.deaths}`}</li>
                <li className="text-red-500">{`loses: ${el.loses}`}</li>
                <li className="text-purple-400">{`time played: ${sf.convert(Math.floor((el.timePlayed) / 60)).format('D days HH hours M min S s')}`}</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
      <Modal active={active} setActive={setActive}>
        <div className="grid grid-cols-6 overflow-scroll">
          {skins?.map((el) => (
            <button type="button" onClick={() => { SkinIdHandler(el.img); }}>
              <div key={el.id} className="card skinImg mr-16 ml-16 items-center">
                <h5 className="card-title justify-center mt-4 mb-1 text-sm text-green-400">{el.name}</h5>
                <img className="skinImg max-h-16 w-12 mb-4" src={`${hostFrontSkin()}${el.img}`} alt="BEST" />
              </div>
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}

export default PersonalArea;
