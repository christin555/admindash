import React from 'react';
import {Box} from '@mui/material';
import dayjs from 'dayjs';
import s from './style.module.scss';

const formatBlock = ({row}) => {
  const {reserved} = row;

  if (!reserved) {
    return;
  }

  const blocks = reserved.map(({id, amount}) => (
    <div key={`${id}`}>
      {`${amount} уп `}
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
