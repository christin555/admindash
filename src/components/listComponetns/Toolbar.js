import React from 'react';
import {inject} from 'mobx-react';
import Box from '@mui/material/Box';
import {TextField} from '@mui/material';
import s from './style.module.scss';

@inject(({ListStore}) => {
  return {
    fastFilterInput: ListStore.fastFilterInput,
    setFastFilter: ListStore.setFastFilter,
    setFastFilterInput: ListStore.setFastFilterInput,
    openDrawerWithMode: ListStore.openDrawerWithMode
  };
})
class Toolbar extends React.Component {
  render() {
    const {
      fastFilterInput,
      setFastFilterInput,
      setFastFilter
    } = this.props;

    return (
      <Box className={s.menu} margin={'20px 0'} display={'flex'} gap={'20px'} justifyContent={'space-between'}>
        <Box width={'390px'} className={s.search}>
          <TextField
            onChange={({target: {value}}) => setFastFilterInput(value)}
            onBlur={setFastFilter}
            value={fastFilterInput || ''}
            size={'small'}
            fullWidth={true}
            placeholder={'Поиск по названию'}
          />
        </Box>
        <Box display={'flex'} gap={'20px'}>

        </Box>
      </Box>
    );
  }
}

export default Toolbar;
