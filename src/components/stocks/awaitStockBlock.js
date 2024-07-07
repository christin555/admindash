import React from 'react';
import {Box} from '@mui/material';
import dayjs from 'dayjs';
import s from './style.module.scss';
import metersCount from './metersCount';

const formatBlock = ({row}) => {
  const {next, metersInPackage} = row;

  if (!next) {
    return;
  }

  const allAmount = next.reduce((acc, {amount}) => acc + amount, 0);

  const blocks = next.map(({id, dateArrival, amount}) => (
    <div key={`${dateArrival}_${amount}`}>
      <span className={s.dateArrival}>{dayjs(dateArrival).format('DD.MM.YYYY')}
      </span>
      {`, ${amount} уп`} <span className={s.helperText}>  {`(приход #${id})`}</span>
    </div>
  ));

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'10px'} padding={'10px 0'}>
      {blocks}
      <div>
        {`Всего: ${metersCount({amount: allAmount, metersInPackage})}`}
      </div>
    </Box>
  );
};

export default formatBlock;
