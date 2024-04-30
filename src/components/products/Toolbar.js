import React from 'react';
import {inject} from 'mobx-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {TextField, Typography} from '@mui/material';
import s from './style.module.scss';
import Checkbox from '@mui/material/Checkbox';

@inject(({ProductsStore}) => {
  return {
    toggleEdit: ProductsStore.toggleEdit,
    isEdit: ProductsStore.isEdit,
    reset: ProductsStore.reset,
    save: ProductsStore.save,
    fastFilterInput: ProductsStore.fastFilterInput,
    setFastFilter: ProductsStore.setFastFilter,
    setFastFilterInput: ProductsStore.setFastFilterInput,
    openDrawerWithMode: ProductsStore.openDrawerWithMode,
    setFilter: ProductsStore.setFilter,
    filter: ProductsStore.filter
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
      setFastFilter,
      setFilter,
      filter
    } = this.props;

    return (
      <Box className={s.menu} margin={'20px 0'} display={'flex'} gap={'20px'} justifyContent={'space-between'}>
        <Box display={'flex'} gap={'20px'}>
          <Box width={'390px'} className={s.search}>
            <TextField
              onChange={({target: {value}}) => setFastFilterInput(value)}
              onBlur={setFastFilter}
              value={fastFilterInput || ''}
              size={'small'}
              fullWidth={true}
              placeholder={'Поиск по названию, коллекции или бренду'}
            />
          </Box>
          <Box display={'flex'} alignItems={'center'}>
            <Typography>Показывать</Typography>
            <Checkbox
              size={'small'}
              checked={filter.showOnSite === null}
              onChange={({target}) => {
                if (target.checked) {
                  setFilter('showOnSite', null);
                }
              }}
              value={null}
            /> <Typography>Все</Typography>
            <Checkbox
              size={'small'}
              checked={filter.showOnSite === true}
              onChange={({target}) => {
                if (target.checked) {
                  setFilter('showOnSite', true);
                } else {
                  setFilter('showOnSite', null);
                }
              }}
              value={true}
            /><Typography>Активные</Typography>
            <Checkbox
              size={'small'}
              checked={filter.showOnSite === false}
              onChange={({target}) => {
                if (target.checked) {
                  setFilter('showOnSite', false);
                } else {
                  setFilter('showOnSite', null);
                }
              }}
              value={false}
            /> <Typography>Скрытые</Typography>
          </Box>
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
