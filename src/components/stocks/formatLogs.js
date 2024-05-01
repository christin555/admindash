import React from 'react';
import {Box} from '@mui/material';
import dayjs from 'dayjs';
import s from './style.module.scss';
import {entity as entityEnum} from '../../enums';

const names = {
  'amount': 'Количество',
  'shippingDate': 'Дата отгрузки',
  'client': 'Клиент',
  'isShipped': 'Отгружен',
  'notes': 'Замтеки',
  'saleDate': 'Дата продажи',
  'isReceived': 'Получен',
  'dateArrival': 'Дата прихода',
  'price': 'сумма',
  'stockCount': 'Остаток на складе'
};

const view = (val, key) => {
  if (['saleDate', 'dateArrival', 'shippingDate'].includes(key)) {
    return dayjs(val).format('DD.MM.YYYY');
  }

  if (typeof val === 'boolean') {
    return val ? 'Да' : 'Нет';
  }

  return val;
};

const formatLogs = ({entity,
  entityId,
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
    price,
    reasonDetails,
    client
  } = data;

  let idBlock = null;

  if (entity === entityEnum.SALE) {
    idBlock = <span className={s.entityName}>Продажа #{entityId}</span>;
  }

  if (entity === entityEnum.ARRIVAL) {
    idBlock = <span className={s.entityName}>Приход #{entityId}</span>;
  }

  if (action === 'editSale') {
    const blocks = Object.keys(after).flatMap((key) => !names[key] ? [] : (
      <span key={key}>
        {names[key]}: {view(before[key], key)} <span className={s.arrow}> -&gt;</span> {view(after[key], key)}
      </span>
    ));

    return (
      <Box display={'flex'} flexDirection={'column'} gap={'10px'} padding={'10px 0'}>
        {idBlock}
        {blocks}
      </Box>
    );
  }

  if (action === 'editArrival') {
    const blocks = Object.keys(after).flatMap((key) => !names[key] ? [] : (
      <span key={key}>
        {names[key]}: {view(before[key], key)} <span className={s.arrow}> -&gt;</span> {view(after[key], key)}
      </span>
    ));

    return (
      <Box display={'flex'} flexDirection={'column'} gap={'10px'} padding={'10px 0'}>
        {idBlock}
        {blocks}
      </Box>
    );
  }

  const stock = stockCount != null ? <span>Остаток на складе: {stockCount}</span> : null;
  const received = isReceived != null ? <span>Получен: {isReceived ? 'Да' : 'Нет'}</span> : null;
  const date = dateArrival ? <span>Дата прихода: {dayjs(dateArrival).format('DD.MM.YYYY')}</span> : null;
  const priceBlock = price ? <span>Стоимость: {price}</span> : null;
  const clientBlock = client ? <span>Клиент: {client}</span> : null;

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'10px'} padding={'10px 0'}>
      {idBlock}
      <span>Количество: {action === 'addStock' ? '+' : ''}{amount}</span>
      {stock}
      {clientBlock}
      {received}
      {date}
      {priceBlock}
      {reason ? (
        <div> Причина: {reason} #{reasonId} ({reasonDetails}) </div>
      ) : null}
    </Box>
  );
};

export default formatLogs;
