import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hostFrontSkin } from '../../config/endPoints';
import { postSkinThunk } from '../../redux/actions/skinsAction';

function Skin({
  name, skinId, img, price,
}) {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  // console.log(user);

  function SkinIdHandler() {
    console.log('click done');
    if (user.balance >= price) {
      console.log('if done');
      dispatch(postSkinThunk(user, skinId, price));
    }
  }

  return (
    <div className="card m-4 shop">
      <img src={`${hostFrontSkin()}${img}`} alt="BEST" />
      <div className="card-body">
        <h5 className="card-title justify-center text-success">{name}</h5>
        <p className="text-info text-2xl">Уникальный скин в игре Kitty Splash</p>
        <h5 className="card-title justify-center text-success">
          {price}
          {' S.coin'}
        </h5>
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
