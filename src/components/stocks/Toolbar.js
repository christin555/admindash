import React from 'react';
import {inject} from 'mobx-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {TextField, Typography} from '@mui/material';
import DataPicker from '../../shared/DataPicker';
import Checkbox from '@mui/material/Checkbox';

@inject(({ListStore}) => {
  return {
    tab: ListStore.tab,
    toggleEdit: ListStore.toggleEdit,
    isEdit: ListStore.isEdit,
    reset: ListStore.reset,
    save: ListStore.save,
    fastFilterInput: ListStore.fastFilterInput,
    setFastFilter: ListStore.setFastFilter,
    setFastFilterInput: ListStore.setFastFilterInput,
    openDrawerWithMode: ListStore.openDrawerWithMode,
    setDate: ListStore.setDate,
    date: ListStore.date,
    filter: ListStore.filterTab,
    setFilter: ListStore.setFilter
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
      tab,
      setDate,
      date,
      filter,
      setFilter
    } = this.props;

    let buttons = null;

    const onlyReceived = (
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
        <Checkbox
          size={'small'}
          checked={filter.isReceived === true}
          onChange={({target}) => {
            if (target.checked) {
              setFilter('isReceived', true);
            } else {
              setFilter('isReceived', null);
            }
          }}
          value={true}
        /><Typography>Полученные</Typography>
        <Checkbox
          size={'small'}
          checked={filter.isReceived === false}
          onChange={({target}) => {
            if (target.checked) {
              setFilter('isReceived', false);
            } else {
              setFilter('isReceived', null);
            }
          }}
          value={false}
        /> <Typography>Не полученные</Typography>
      </Box>
    );

    const onlyShipped = (
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
        <Checkbox
          size={'small'}
          checked={filter.isShipped === true}
          onChange={({target}) => {
            if (target.checked) {
              setFilter('isShipped', true);
            } else {
              setFilter('isShipped', null);
            }
          }}
          value={true}
        /><Typography>Отгруженные</Typography>
        <Checkbox
          size={'small'}
          checked={filter.isShipped === false}
          onChange={({target}) => {
            if (target.checked) {
              setFilter('isShipped', false);
            } else {
              setFilter('isShipped', null);
            }
          }}
          value={false}
        /> <Typography>Не отгруженные</Typography>
      </Box>
    );

    if (tab === 'logs') {
      return null;
    }

    if (tab === 'stock') {
      buttons = (
        <Button
          variant={'contained'}
          onClick={() => this.props.openDrawerWithMode('add')}
        > Добавить приход
        </Button>
      );

    } else if (!isEdit) {
      buttons = (
        <React.Fragment>
          <Button variant={'contained'} onClick={toggleEdit}> Редактировать </Button>
          <Button
            variant={'contained'}
            color={'secondary'}
            onClick={() => this.props.openDrawerWithMode('add')}
          > Добавить
          </Button>
        </React.Fragment>
      );
    } else {
      buttons = (
        <React.Fragment>
          <Button variant={'contained'} onClick={save}> Сохранить </Button>
          <Button variant={'contained'} onClick={reset} color={'secondary'}> Отмена </Button>
        </React.Fragment>
      );
    }

    return (
      <Box margin={'20px 0'} display={'flex'} gap={'20px'} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'} gap={'10px'}>
          <div style={{width: '250px'}}>
            <TextField
              onChange={({target: {value}}) => setFastFilterInput(value)}
              onBlur={setFastFilter}
              value={fastFilterInput || ''}
              size={'small'}
              fullWidth={true}
              placeholder={'Поиск по названию или арт'}
            />
          </div>
          <Box display={'flex'} alignItems={'center'} gap={'8px'} minWidth={'200px'}>
            <div>
                    Период
            </div>

            <div style={{width: '160px'}}>
              <DataPicker
                slotProps={{textField: {size: 'small'}}}
                val={date.min}
                setValue={(val) => setDate('min', val)}
              />
            </div>

            <div> -</div>
            <div style={{width: '160px'}}>
              <DataPicker
                slotProps={{textField: {size: 'small'}}}
                val={date.max}
                setValue={(val) => setDate('max', val)}
              />
            </div>
            {tab === 'stockArrival' ? onlyReceived : null}
            {tab === 'sales' ? onlyShipped : null}
          </Box>
        </Box>
        <Box display={'flex'} gap={'20px'}>
          {buttons}
        </Box>
      </Box>
    );
  }
}

export default Toolbar;
