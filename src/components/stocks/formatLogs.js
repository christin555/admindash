import React from 'react';
import {Box} from '@mui/material';
import dayjs from 'dayjs';
import s from './style.module.scss';
import {entity as entityEnum} from '../../enums';

const formatLogs = ({entity,
  entityId,
  productId,
  action,
  data}) => {
  if (!data) {
    return null;
  }
  const {
    amount,
    reason,
    reasonId,
    stockCount,
    before,
    after,
    isReceived,
    dateArrival,
    price
  } = data;

  let idBlock = null;

  if (entity === entityEnum.SALE) {
    idBlock = <span className={s.entityName}>Продажа #{entityId}</span>;
  }

  if (entity === entityEnum.ARRIVAL) {
    idBlock = <span className={s.entityName}>Приход #{entityId}</span>;
  }

  if (action === 'editSale') {
    return (
      <Box display={'flex'} flexDirection={'column'} gap={'10px'} padding={'10px 0'}>
        {idBlock}
        <span>Количество: {before.amount} <span className={s.arrow}> -&gt;</span> {after.amount} </span>
        <span>Заметки: {before.notes} <span className={s.arrow}> -&gt;</span> {after.notes} </span>
        <span>Дата продажи: {dayjs(before.saleDate).format('DD.MM.YYYY')} <span className={s.arrow}> -&gt;</span> {dayjs(after.saleDate).format('DD.MM.YYYY')} </span>
      </Box>
    );
  }

  if (action === 'editArrival' || action === 'editSale') {
    return (
      <Box display={'flex'} flexDirection={'column'} gap={'10px'} padding={'10px 0'}>
        {idBlock}
        <span>Количество: {before.amount} <span className={s.arrow}> -&gt;</span> {after.amount} </span>
        <span>Получен: {before.isReceived ? 'Да' : 'Нет'} <span className={s.arrow}> -&gt;</span> {after.isReceived ? 'Да' : 'Нет'} </span>
        <span>Дата прихода: {dayjs(before.dateArrival).format('DD.MM.YYYY')} <span className={s.arrow}> -&gt;</span> {dayjs(after.dateArrival).format('DD.MM.YYYY')} </span>
      </Box>
    );
  }

  const stock = stockCount != null ? <span>Остаток на складе: {stockCount}</span> : null;
  const received = isReceived != null ? <span>Получен: {isReceived ? 'Да' : 'Нет'}</span> : null;
  const date = dateArrival ? <span>Дата прихода: {dayjs(dateArrival).format('DD.MM.YYYY')}</span> : null;
  const priceBlock = price ? <span>Стоимость: {price}</span> : null;

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'10px'} padding={'10px 0'}>
      {idBlock}
      <span>Количество: {action === 'addStock' ? '+' : ''}{amount}</span>
      {stock}
      {received}
      {date}
      {priceBlock}
      {reason ? (
        <span>
        Причина: {reason} #{reasonId}
        </span>
      ) : null}
    </Box>
  );
};

export default formatLogs;
