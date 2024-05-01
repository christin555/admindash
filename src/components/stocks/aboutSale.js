import React from 'react';
import {Box} from '@mui/material';
import s from './style.module.scss';

const formatBlock = ({row}) => {
  const {client, notes, price} = row;

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'10px'} padding={'10px 0'}>
      <div> Клиент: {client ?? '—'} </div>
      <div> Сумма продажи: {price ?? '—'} </div>
      {notes ? <div className={s.notes}> {notes} </div> : null}
    </Box>
  );
};

export default formatBlock;
