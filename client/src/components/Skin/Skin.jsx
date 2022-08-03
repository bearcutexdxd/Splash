import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hostFrontSkin } from '../../config/endPoints';
import { getSkinThunk } from '../../redux/actions/skinAction';

function Skin(name, id, img) {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  function SkinIdHandler() {
    dispatch(getSkinThunk(user, id));
  }
  const nameCard = 'pipo-nekonin010.png';

  return (
    <div className="card m-4 shop">
      <img src={`${hostFrontSkin()}${nameCard}`} alt="BEST" />
      <div className="card-body">
        <h5 className="card-title justify-center text-success">Name of Skin</h5>
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
