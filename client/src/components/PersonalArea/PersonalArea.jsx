import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function PersonalArea() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const stats = useSelector((store) => store.stats);

  return (
    <div>asdasd</div>
  );
}

export default PersonalArea;
