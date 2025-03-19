import FormCheckbox from './FormCheckbox';
import React from 'react';
import Price from './Price';
import Range from './Range';
import Select from '../../../../shared/Select';
import {Box} from '@mui/material';

const isChecked = (checked, key, value) => !!checked[`${key}-${value}`];
const isDisabled = (disabled, key, value) => disabled[`${key}-${value}`];

// eslint-disable-next-line react/display-name
const Fields = ({values: filterValues, unit, setValue}) =>
  ({name, type, values, postfix}) => {

    const setValueMultiHandler = (arrayValues) => {
      setValue(name, arrayValues.map(({value}) => value));
    };

    if (name === 'price') {
      return (
        <Price
          values={filterValues}
          onChange={setValue}
          unit={unit}
        />
      );
    }

    if (type === 'range') {
      return (
        <Range
          name={name}
          checked={filterValues}
          onChange={setValue}
          unit={'мм'}
        />
      );
    }

    if (type === 'multiselect') {
      return (
        <Select
          isMulti={true}
          options={values}
          value={filterValues[name]}
          onChange={setValueMultiHandler}
        />
      );
    }

    if (!Array.isArray(values) || !values) {
      return null;
    }

    return (
      <Select
        isMulti={true}
        options={values.map(({id, title}) => {
          return {
            value: id,
            label: title,
            title
          };
        })}
        value={filterValues[name]}
        onChange={setValueMultiHandler}
      />
    );
  };

export default Fields;
