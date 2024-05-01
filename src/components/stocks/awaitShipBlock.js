import React from 'react';
import {Box} from '@mui/material';
import dayjs from 'dayjs';
import s from './style.module.scss';

const formatBlock = ({row}) => {
  const {awaits} = row;

  if (!awaits) {
    return;
  }

  const blocks = awaits.map(({id, shippingDate, amount}) => (
    <div key={`${shippingDate}_${amount}`}>
      {`${amount} уп. до `}
      <span className={s.dateArrival}>{dayjs(shippingDate).format('DD.MM.YYYY')}</span>
      <span className={s.helperText}>  {`(продажа #${id})`}</span>
    </div>
  ));

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'10px'} padding={'10px 0'}>
      {blocks}
    </Box>
  );
};

export default formatBlock;
