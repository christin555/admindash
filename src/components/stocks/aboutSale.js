import React from 'react';
import {Box} from '@mui/material';
import s from './style.module.scss';

const formatBlock = ({row}) => {
  const {client, notes, price, arrival} = row;

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'10px'} padding={'10px 0'}>
      <div className={s.saleDetails}>
        <div className={s.saleDetailsTitle}>Клиент:</div>
        <div>{client ?? '—'}</div>
      </div>

      <div className={s.saleDetails}>
        <div className={s.saleDetailsTitle}>Сумма продажи:</div>
        <div>{price ?? '—'}</div>
      </div>

      {arrival ? (
        <div>
          <div className={s.saleDetails}>
            <div className={s.saleDetailsTitle}>Продажа от прихода:</div>
            <div>  {`№ счета ${arrival.accountNumber}(#${arrival.id})`}</div>
          </div>
        </div>
      ) : null}

      {notes ? <div className={s.notes}> {notes} </div> : null}
    </Box>
  );
};

export default formatBlock;
