import React from 'react';
import {Box} from '@mui/material';
import s from './style.module.scss';
import classNames from "classnames";
import formatPrice from './priceFormat';

const formatBlock = ({row}) => {
  const {client, notes, price, arrival} = row;

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'10px'} padding={'10px 0'}>
      <div className={s.details}>
        <div className={s.detailsTitle}>Клиент:</div>
        <div>{client ?? '—'}</div>
      </div>

      <div className={s.details}>
        <div className={s.detailsTitle}>Сумма продажи:</div>
        <div>{formatPrice(price) ?? '—'}</div>
      </div>

      {arrival ? (
        <div>
          <div className={classNames(s.chip, s.details)}>
            <div className={s.detailsTitle}>Продажа с прихода:</div>
            <div>  {`№ счета ${arrival.accountNumber} (#${arrival.id})`}</div>
          </div>
        </div>
      ) : null}

      {notes ? <div className={s.notes}> {notes} </div> : null}
    </Box>
  );
};

export default formatBlock;
