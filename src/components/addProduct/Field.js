import React from 'react';
import {FormControl, FormControlLabel, Radio, RadioGroup, Typography} from '@mui/material';
import {TextField} from '@mui/material';
import Box from '@mui/material/Box';
import Select from '../../shared/Select';
import MediaBlock from './MediaBlock';
import VideoBlock from './VideoBlock';
import ImgsBlock from './ImgsBlock';
import Relations from './Relations';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';

const Field = ({placeholder, name, type, title, adminDesc, search, values, product, setValue, isRequired, isMulti}) => {
  const setValueHandler = ({value}) => setValue(name, value);
  const changeValueHandler = ({target: {value}}) => setValue(name, value);

  const changeBoolValueHandler = ({target: {value}}) => setValue(name, value === 'true');

  const setValueMultiHandler = (arrayValues) => {
    setValue(name, arrayValues.map(({value}) => value));
  };
  const setRelations = (arrayValues) => {
    setValue(name, arrayValues);
  };

  let block;

  switch (type) {
    case 'character varying':
      block = (
        <TextField
          variant='standard'
          maxLength={255}
          value={product[name] || ''}
          onChange={changeValueHandler}
          helperText={adminDesc}
        />
      );
      break;
    case 'text':
      block = (
        <TextField
          minRows={2}
          multiline={true}
          value={product[name] || ''}
          onChange={changeValueHandler}
          helperText={adminDesc}
        />
      );
      break;
    case 'select':
      block = (
        <Select
          options={values}
          value={product[name]}
          onChange={setValueHandler}
        />
      );
      break;
    case 'multiselect':
      block = (
        <Select
          isMulti={true}
          options={values}
          value={product[name]}
          onChange={setValueMultiHandler}
        />
      );
      break;
    case 'catalogImgs':
      block = <ImgsBlock />;
      break;
    case 'catalogVideo':
      block = <VideoBlock />;
      break;
    case 'mediaDrop':
      block = (
        <MediaBlock
          value={product[name]}
          onChange={setValueHandler}
          isMulti={isMulti}
        />
      );
      break;
    case 'relations':
      block = (
        <Relations
          relations={product[name]}
          onChange={setRelations}
          search={search}
        />
      );
      break;
    case 'searchSelect' :
      block = (
        <Select
          value={product[name] || null}
          onChange={(val) => setValue(name, val)}
          loadOptions={search}
          placeholder={placeholder}
        />
      );
      break;
    case 'date':
      block = (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
          <DatePicker
            value={product[name] ? dayjs(product[name]) : null}
            onChange={(val) => setValue(name, val)}
          />
        </LocalizationProvider>
      );
      break;
    case 'integer':
      block = (
        <TextField
          type='number'
          variant='standard'
          value={product[name] || ''}
          onChange={changeValueHandler}
          helperText={adminDesc}
        />
      );
      break;
    case 'boolean':
      block = (
        <FormControl>
          <RadioGroup row={true} value={product[name]} onChange={changeBoolValueHandler}>
            <FormControlLabel value={true} control={<Radio />} label='Да' />
            <FormControlLabel value={false} control={<Radio />} label='Нет' />
          </RadioGroup>
        </FormControl>
      );
      break;
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
    >
      <Typography
        style={{marginBottom: '4px', display: 'flex', fontWeight: '300'}}
      >
        {title || name} {isRequired && <Box marginLeft={'10px'} color={'red'}> * </Box> || null}
      </Typography>
      {block}
    </Box>
  );
};

export default Field;
