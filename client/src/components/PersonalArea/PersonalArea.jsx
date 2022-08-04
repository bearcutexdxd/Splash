import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStats } from '../../redux/actions/statisticsAction';
import Navbar from '../Navbar/Navbar';

function PersonalArea() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const stats = useSelector((store) => store.stats);
  useEffect(() => {
    dispatch(getStats(user.id));
  }, []);
  console.log(stats);

  return (
    <>
      <Navbar />
      <div>{user.name}</div>
      <div>{stats.Statistic.kills}</div>
    </>
  );
}

export default PersonalArea;
