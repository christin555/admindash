import React from 'react';
import {FormControlLabel} from '@mui/material';
import s from './style.module.scss';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import cn from 'classnames';

const FormCheckbox = (props) => {
  const {checked, onChange, title, id, disabled, img} = props;

  const handleChecked = (evt) => {
    if (onChange) {
      onChange(evt.target.checked, {title, id});
    }
  };

  if (disabled) {
    return null;
  }

  return (
    <FormControlLabel
      className={s.checkboxControl}
      key={id}
      control={(img ? (
        <div
          onClick={() => !disabled && onChange(!checked, {title, id})}
          className={cn(s.imgCheckbox, {[s.checked]: checked, [s.disabled]: disabled})}
        >
          <img src={img} alt={title} />
        </div>
      ) : (
        <Checkbox
          disabled={disabled}
          size={'small'}
          checked={checked}
          onChange={handleChecked}
          name='checkedA'
          style={{padding: '4px 9px'}}
          color={'secondary'}
        />
      )
      )}
      label={title}
    />
  );
};

FormCheckbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.number,
  disabled: PropTypes.bool
};

export default FormCheckbox;
