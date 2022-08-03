import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hostFrontSkin } from '../../config/endPoints';
import { postSkinThunk } from '../../redux/actions/skinsAction';

function Skin({ name, skinId, img }) {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  function SkinIdHandler() {
    dispatch(postSkinThunk(user, skinId));
  }
  const nameCard = 'pipo-nekonin010.png';

  return (
    <div className="card m-4 shop">
      <img src={`${hostFrontSkin()}${img}`} alt="BEST" />
      <div className="card-body">
        <h5 className="card-title justify-center text-success">{name}</h5>
        <p className="text-info text-2xl">Уникальный скин в игре Kitty Splash</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary text-warning"
            type="button"
            onClick={() => { SkinIdHandler(); }}
          >
            Buy now!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Skin;
