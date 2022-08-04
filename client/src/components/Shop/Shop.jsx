import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSkinsThunk } from '../../redux/actions/skinsAction';
import Navbar from '../Navbar/Navbar';
import Skin from '../Skin/Skin';

function Shop() {
  const dispatch = useDispatch();
  const skins = useSelector((store) => store.skins);
  useEffect(() => {
    dispatch(getSkinsThunk());
  }, []);
  return (
    <>
      <Navbar />
      <div className="backshop">
        <div className="container mx-auto px-4 text-white text-6xl">
          Магазин Четыре лапы
          <div className="grid grid-cols-6">
            {skins?.map((el) => (
              <Skin key={el.id} skinId={el.id} name={el.name} img={el.img} price={el.price} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
