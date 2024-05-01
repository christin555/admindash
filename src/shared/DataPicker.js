import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import React from 'react';

const dataPicker = ({val, setValue, slotProps}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
    <DatePicker
      value={val ? dayjs(val) : null}
      onChange={(date) => setValue(dayjs(date).format('YYYY.MM.DD.'))}
      slotProps={slotProps}
    />
  </LocalizationProvider>
);

export default dataPicker;
