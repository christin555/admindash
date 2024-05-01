import React from 'react';
import {inject} from 'mobx-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {TextField} from '@mui/material';
import s from './style.module.scss';
import DataPicker from "../../shared/DataPicker";

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
    date: ListStore.date
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
      date
    } = this.props;

    let buttons = null;

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
          <TextField
            onChange={({target: {value}}) => setFastFilterInput(value)}
            onBlur={setFastFilter}
            value={fastFilterInput || ''}
            size={'small'}
            fullWidth={true}
            placeholder={'Поиск по названию'}
          />
          <Box display={'flex'} alignItems={'center'} gap={'8px'} minWidth={'400px'}>
            <div>
              Период
            </div>

            <DataPicker
              slotProps={{textField: {size: 'small'}}}
              val={date.min}
              setValue={(val) => setDate('min', val)}
            />

            <div> - </div>
            <DataPicker
              slotProps={{textField: {size: 'small'}}}
              val={date.max}
              setValue={(val) => setDate('max', val)}
            />

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
