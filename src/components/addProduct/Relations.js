import React from 'react';
import Box from '@mui/material/Box';
import Select from '../../shared/Select';
import Button from '../../shared/Button';

const entities = [
  {label: 'CATEGORY', value: 1},
  {label: 'PRODUCT', value: 2},
  {label: 'SERVICE', value: 4},
  {label: 'WORK', value: 5}
];
const Relations = (props) => {
  const {relations = [{}], search, onChange} = props;

  const setEntity = (index, val) => {
    const copy = [...relations];

    copy[index].entity = val;

    onChange(copy);
  };

  const setEntityId = (index, val) => {
    const copy = [...relations];

    copy[index].entityId = val;

    onChange(copy);
  };

  const del = (index) => {
    const copy = [...relations];

    delete copy[index];

    onChange(copy.filter(Boolean));
  };

  const add = () => {
    const copy = [...relations];

    copy.push({});

    onChange(copy);
  };

  return (
    <div>
      {
        relations.map((item, index) => {
          const {entity, entityId} = item || {};

          return (
            <Box
              key={index}
              padding={'6px'}
              style={{border: '0.6px solid #d3e5f2'}}
              display={'flex'}
              flexDirection={'column'}
              alignItems={'flex-start'}
              margin={'10px 0'}
              gap={'15px'}
            >
              <Box
                width={'100%'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                gap={'10px'}
              >
                <Select
                  options={entities}
                  value={entity}
                  onChange={(val) => setEntity(index, val)}
                />
                <Select
                  value={entityId}
                  onChange={(val) => setEntityId(index, val)}
                  loadOptions={(val) => search({type: entity?.value || entity, fastfilter: val})}
                />
              </Box>
              <Button
                onClick={() => del(index)}
                variant={'containedSecondary'}
                size={'small'}
              >
                  Удалить
              </Button>
            </Box>
          );
        })
      }

      <Button onClick={add}> Добавить </Button>
    </div>
  );
};

export default Relations;
