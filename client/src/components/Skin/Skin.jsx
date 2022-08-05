import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hostFrontSkin } from '../../config/endPoints';
import { postSkinThunk } from '../../redux/actions/skinsAction';

function Skin({
  name, skinId, img, price,
}) {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  function SkinIdHandler() {
    if (user.balanc >= price) {
      dispatch(postSkinThunk(user, skinId, price));
    }
  }

  return (
    <div className="card m-4 shop">
      <img src={`${hostFrontSkin()}${img}`} alt="BEST" />
      <div className="card-body">
        <h5 className="card-title justify-center text-success text-2xl">{name}</h5>
        <h5 className="card-title justify-center text-warning">
          {price}
          {' kitcoin'}
        </h5>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary text-white"
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
