import React from 'react';
import { useSelector } from 'react-redux';
import Skin from '../Skin/Skin';

function Shop() {
  const skin = useSelector((store) => store.skin);

  return (
    <div className="backshop">
      <div className="container mx-auto px-4 text-white text-6xl">
        Магазин Четыре лапы
        <div className="grid grid-cols-6">
          {/* {skin?.map((el) => (
            <Skin key={el.id} id={el.id} name={el.name} img={el.img} />
          ))} */}
          <Skin />
          <Skin />
          <Skin />
          <Skin />
          <Skin />
          <Skin />
          <Skin />
          <Skin />
          <Skin />
          <Skin />
          <Skin />
          <Skin />
          <Skin />
          <Skin />
          <Skin />
          <Skin />
        </div>
      </div>
    </div>
  );
}

export default Shop;
