import React from 'react';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';

const customStyles = {
  control: (provided, state) => {
    return {
      ...provided,
      'padding': '0 2px',
      'borderColor': 'rgba(226, 226, 226, 0.6)',
      'boxShadow': state.isFocused ? '0 0px 4px rgba(233,245,245)' : 0,
      '&:hover': {
        'borderColor': 'rgba(217,217,217,0.83)'
      },
      fontSize: '14px'
    };
  },
  placeholder: (provided, state) => {
    return {
      ...provided,
      position: 'relative',
      whiteSpace: 'nowrap',
      opacity: state.isFocused ? 0.5 : 1,
      overflow: 'hidden',
      color: 'gray',
      textOverflow: 'ellipsis',
      transform: 'none',
      'marginRight': '10px'
    };
  },
  input: (provided) => {
    return {
      ...provided,
      position: 'absolute'
    };
  },
  valueContainer: (provided) => {
    return {
      ...provided,
      'padding': '0',
      'minHeight': '20px',
      'minWidth': '150px'
    };
  },
  singleValue: (provided, state) => {
    return {
      ...provided,
      position: 'relative',
      whiteSpace: 'nowrap',
      opacity: state.isFocused ? 0.5 : 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      transform: 'none',
      fontSize: '14px'
    };
  },
  menu: (provided) => {
    return {
      ...provided,
      fontSize: '14px'
    };
  },
  option: (provided, state) => {
    return {
      ...provided,
      background: state.isSelected && 'rgba(146, 153, 167, 0.1)',
      color: state.isSelected && 'black'
    };
  }
};

class Select extends React.Component {
  defaultPlaceholder = 'Выберете значение'

  render() {
    const {placeholder, isMulti, options, loadOptions, defaultOptions, value} = this.props;
    const values = [value].flat().map((item) => item?.value || item);

    const selected = isMulti ?
      options?.filter(({value: val}) => values?.includes(val)) :
      options?.find(({value: val}) => typeof value === 'number' ? Number(val) === Number(value) : val === value);

    return (
      !loadOptions && (
        <ReactSelect
          isMulti={isMulti}
          placeholder={placeholder || this.defaultPlaceholder}
          {...this.props}
          styles={customStyles}
          options={options}
          value={selected}
        />
      ) || (
        <AsyncSelect
          isMulti={isMulti}
          placeholder={placeholder || this.defaultPlaceholder}
          {...this.props}
          styles={customStyles}
          loadOptions={loadOptions}
          cacheOptions={true}
          defaultOptions={defaultOptions}
        />
      )
    );
  }
}

export default Select;
