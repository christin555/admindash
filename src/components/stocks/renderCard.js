import React from 'react';
import s from './style.module.scss';

const renderCard = ({row, setDrawerCardShow}) => (
  <div className={s.cardHeader} onClick={() => setDrawerCardShow(true, row)}>
    <div className={s.name}>
      <span className={s.code}> арт. {row.code} | </span> {row.name}
    </div>
  </div>
);

export default renderCard;
