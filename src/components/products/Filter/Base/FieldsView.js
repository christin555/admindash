import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import getFields from './fields';
import {Box, Skeleton, Typography} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

@inject(({FilterStore}) => {
  return {
    fields: FilterStore.fields || [],
    unit: FilterStore.unitPrice,
    setValue: FilterStore.setValue,
    values: FilterStore.values
  };
}) @observer
class Fields extends Component {
  render() {
    const {
      values,
      fields,
      setValue,
      unit
    } = this.props;

    if (!fields.length) {
      return [0, 1, 2, 3, 4].map((i) =>
        <Skeleton key={i} style={{marginTop: 20}} />);
    }

    const filterFields = getFields({
      values, unit, fields, setValue
    });

    return fields.map((field) => (
      <Box
        key={field.name}
        display={'flex'}
        flexDirection={'row'}
        gap={'10px'}
      >
        <Typography
          component={'div'}
          style={{
            width: '200px',
            marginBottom: '4px',
            display: 'flex',
            fontWeight: '300',
            alignItems: 'center'
          }}
        >
          {field.title}
        </Typography>
        <Box
          width={'100%'}
          display={'flex'}
          flexDirection={'row'}
          gap={'32px'}
        >
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
          >
            <Checkbox
              size={'small'}
              checked={values[field.name] === null}
              onChange={({target}) => {
                if (target.checked) {
                  setValue(field.name, null);
                } else {
                  setValue(field.name, undefined);
                }
              }}
              value={true}
            />
            <Typography
              color={'secondary'}
              variant={'body1'}
              component={'span'}
            >
              Не заполнено
            </Typography>
          </Box>
          <Box sx={{'flex': 1}}>
            {filterFields(field)}
          </Box>
        </Box>
      </Box>
    ));
  }
}

Fields.propTypes = {
  collections: PropTypes.array,
  finishingMaterials: PropTypes.array,
  setCollection: PropTypes.func,
  setFinishingMaterial: PropTypes.func,
  checkedCollections: PropTypes.object
};

export default Fields;
