import React, {useState} from 'react';
import {TextField} from '@mui/material';
import formatPrice from '../../../../../src/utils/formatPrice';
import InputAdornment from '@mui/material/InputAdornment';
import s from './style.module.scss';

const Price = (props) => {
  const {values, onChange, unit} = props;

  const [minPrice, _setMinPrice] = useState(formatPrice({price: values.price?.min}));
  const [maxPrice, _setMaxPrice] = useState(formatPrice({price: values.price?.max}));

  React.useEffect(() => {
    _setMinPrice(formatPrice({price: values.price?.min}));
  }, [values.price?.min]);
  React.useEffect(() => {
    _setMaxPrice(formatPrice({price: values.price?.max}));
  }, [values.price?.max]);

  const setMinPrice = (price) => _setMinPrice(formatPrice({price}));
  const setMaxPrice = (price) => _setMaxPrice(formatPrice({price}));

  const onBlur = (val, type) => {
    const _val = parseInt(val.replace(/\s+/g, ''), 10);

    if (type === 'minPrice') {
      setMinPrice(_val);
    }

    if (type === 'maxPrice') {
      setMaxPrice(_val);
    }

    onChange(_val, type);
  };

  return (
    <div className={s.price}>
      <TextField
        size={'small'}
        onBlur={({target: {value}}) => onBlur(value, 'minPrice')}
        value={minPrice}
        onChange={({target: {value}}) => setMinPrice(value)}
        id='outlined-basic'
        variant='outlined'
        placeholder={'0'}
        InputProps={{
          endAdornment: <InputAdornment position='end'>{unit}</InputAdornment>
        }}
      />
      <div className={s.rangeSeparator} />
      <TextField
        size={'small'}
        onBlur={({target: {value}}) => onBlur(value, 'maxPrice')}
        value={maxPrice}
        onChange={({target: {value}}) => setMaxPrice(value)}
        id='outlined-basic'
        variant='outlined'
        placeholder={'0'}
        InputProps={{
          endAdornment: <InputAdornment position='end'>{unit}</InputAdornment>
        }}
      />
    </div>
  );
};

export default Price;
