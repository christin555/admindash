import React from 'react';
import {Box} from '@mui/material';
import dayjs from 'dayjs';
import s from './style.module.scss';
import metersCount from './metersCount';
import Divider from '@mui/material/Divider';

const formatBlock = ({row}) => {
  const {next, metersInPackage, reservedAmount} = row;

  if (!next) {
    return;
  }

  const allAmount = next.reduce((acc, {amount}) => acc + amount, 0);
  const reserved = reservedAmount || 0;
  const forSale = allAmount - reserved;

  const blocks = next.map(({id, dateArrival, amount}) => (
    <div key={`${dateArrival}_${amount}`}>
      <span className={s.dateArrival}>{dayjs(dateArrival).format('DD.MM.YYYY')}
      </span>
      {`, ${amount} уп`} <span className={s.helperText}>  {`(приход #${id})`}</span>
    </div>
  ));

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'10px'} padding={'10px 0'} alignSelf={'flex-start'}>
      <div>
        {`Доступно:`}
        <span className={s.amount}>
          {metersCount({amount: forSale, metersInPackage})}
        </span>
      </div>
      <div>
        {`Резерв:`}
        <span className={s.amount}>{
          metersCount({amount: reserved, metersInPackage})
        }
        </span>
      </div>
      <div>
        {`Всего: `}
        <span className={s.amount}>
          {metersCount({amount: allAmount, metersInPackage})}
        </span>
      </div>
      <Divider />
      {blocks}
    </Box>
  );
};

export default formatBlock;
