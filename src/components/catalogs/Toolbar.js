import React from 'react';
import {inject} from 'mobx-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {TextField} from '@mui/material';
import s from './style.module.scss';

@inject(({ListStore}) => {
  return {
    toggleEdit: ListStore.toggleEdit,
    isEdit: ListStore.isEdit,
    reset: ListStore.reset,
    save: ListStore.save,
    fastFilterInput: ListStore.fastFilterInput,
    setFastFilter: ListStore.setFastFilter,
    setFastFilterInput: ListStore.setFastFilterInput,
    openDrawerWithMode: ListStore.openDrawerWithMode
  };
})
class Toolbar extends React.Component {
  render() {
    const {
      reset,
      isEdit,
      toggleEdit,
      save,
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
          {
            !isEdit && (
              <React.Fragment>
                <Button variant={'contained'} onClick={toggleEdit}> Редактировать </Button>
                <Button
                  variant={'contained'}
                  color={'secondary'}
                  onClick={() => this.props.openDrawerWithMode('add')}
                > Добавить
                </Button>
              </React.Fragment>
            ) ||
                            (
                              <React.Fragment>
                                <Button variant={'contained'} onClick={save}> Сохранить </Button>
                                <Button variant={'contained'} onClick={reset} color={'secondary'}> Отмена </Button>
                              </React.Fragment>
                            )
          }
        </Box>
      </Box>
    );
  }
}

export default Toolbar;
