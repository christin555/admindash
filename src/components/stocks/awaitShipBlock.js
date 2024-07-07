import React from 'react';
import {Box} from '@mui/material';
import dayjs from 'dayjs';
import s from './style.module.scss';

const formatBlock = ({row}) => {
  const {awaits} = row;

  if (!awaits) {
    return;
  }

  const allAmount = awaits.reduce((acc, {amount}) => acc + amount, 0);

  const blocks = awaits.map(({id, shippingDate, amount, arrivalId}) => (
    <div key={`${shippingDate}_${amount}`}>
      <span className={s.dateArrival}>{`до ${dayjs(shippingDate).format('DD.MM.YYYY')}`}</span>
      {`, ${amount} уп.`}
      <span className={s.helperText}>  {`(продажа #${id}${arrivalId ? ' с прихода' : ''})`}</span>
    </div>
  ));

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'10px'} padding={'10px 0'}>
      {blocks}
      <div>
        {`Всего: ${allAmount} уп`}
      </div>
    </Box>
  );
};

export default formatBlock;
