import React from 'react';
import {Box} from '@mui/material';
import dayjs from 'dayjs';

const formatLogs = ({data}) => {
  if (!data) {
    return null;
  }
  const {productId, amount, reason, reasonDate} = JSON.parse(data);

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'10px'} padding={'10px 0'}>
      <span>Артикул товара: {productId}</span>
      <span>Количество: {amount}</span>
      {reason ? (
        <span>
        Причина: {reason} от {dayjs(reasonDate).format('DD.MM.YYYY') || 'Не указано'}
        </span>
      ) : null}
    </Box>
  );
};

export default formatLogs;
