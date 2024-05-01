import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import {toJS} from 'mobx';
import {Box, Tab, Button, Tooltip} from '@mui/material';
import Tabs, {tabsClasses} from '@mui/material/Tabs';
import Table from './Table';
import DataPicker from '../../../shared/DataPicker';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import HelpIcon from '@mui/icons-material/Help';

@inject(({DrawerCardStore}) => {
  return {
    card: toJS(DrawerCardStore.card),
    tab: DrawerCardStore.tab,
    setTab: DrawerCardStore.setTab,
    date: DrawerCardStore.date,
    setDate: DrawerCardStore.setDate
  };
})
class DrawerStore extends React.Component {
  close = () => this.props.setDrawerShow(false);

  render() {
    const {
      card,
      tab,
      setTab,
      date,
      setDate
    } = this.props;

    const salePrice = card.prices?.salePrice ?
      <div> {`Цена со скидкой: ${card.prices?.salePrice} руб`}  </div> :
      null;

    const price = card.prices?.price ?
      <div> {`Цена: ${card.prices?.price} руб`}  </div> :
      null;

    const blocks = card.next ? card.next.map(({id, dateArrival, amount}) => (
      <div key={`${dateArrival}_${amount}`}>
        <span className={s.dateArrival}> {dateArrival}</span>
        {`, ${amount} уп`} <span className={s.helperText}>  {`(приход #${id})`}</span>
      </div>
    )) : null;

    const awaits = card.awaits ? card.awaits.map(({id, shippingDate, amount}) => (
      <div key={`${shippingDate}_${amount}`}>
        {`${amount} уп. до `}
        <span className={s.dateArrival}>{dayjs(shippingDate).format('DD.MM.YYYY')}</span>
        <span className={s.helperText}>  {`(продажа #${id})`}</span>
      </div>
    )) : null;

    return (
      <div className={s.fields}>
        <div className={s.headerCard}>
          <div>
            <div className={s.name}>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={`https://master-pola.com/product/${card.alias}`}
              >
                {card.name}
              </a>
            </div>
            <div className={s.code}> aрт. {card.code}</div>
          </div>

          {/*<div className={s.buttons}>*/}
          {/*  <Button*/}
          {/*    className={s.button}*/}
          {/*    variant={'outlined'}*/}
          {/*    startIcon={<AddIcon width={'10px'} />}*/}
          {/*  >*/}
          {/*    Добавить приход*/}
          {/*  </Button>*/}
          {/*  <Button*/}
          {/*    className={s.button}*/}
          {/*    variant={'outlined'}*/}
          {/*    startIcon={<AddIcon width={'10px'} />}*/}
          {/*  >*/}
          {/*    Добавить продажу*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </div>

        <div className={s.prices}>
          {salePrice}
          {price}
        </div>

        <Box display={'flex'} flexDirection={'row'} alignItems={'flex-start'} gap={'160px'}>
          <Box alignItems={'center'} display={'flex'} className={s.fieldName} gap={'6px'}>
            В наличии: {card.amount} уп
            <Tooltip title='Без учета хранения и ожидаемых приходов'>
              <HelpIcon fontSize={'10px'} />
            </Tooltip>
          </Box>

          <Box display={'flex'} flexDirection={'column'} gap={'10px'} fontWeight={400}>
            <Box fontWeight={450}>Ожидается:</Box>
            {blocks}
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={'10px'} fontWeight={400}>
            <Box fontWeight={450}>На хранении:</Box>
            {awaits}
          </Box>
        </Box>

        <Box margin={'40px 0'} sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs
            variant='scrollable'
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': {opacity: 0.3}
              }
            }}
            value={tab}
            onChange={setTab}
            aria-label='basic tabs example'
          >
            <Tab
              key={'stock'}
              value={'stock'}
              label={'Склад'}
            />

            <Tab
              key={'stockArrival'}
              value={'stockArrival'}
              label={'Приходы'}
            />

            <Tab
              key={'sales'}
              value={'sales'}
              label={'Продажи'}
            />

            <Tab
              key={'logs'}
              value={'logs'}
              label={'Логи'}
            />
          </Tabs>
        </Box>

        <Box display={'flex'} padding={'2px 0 12px'} alignItems={'center'} gap={'8px'}>
          <div>
            Период
          </div>

          <DataPicker
            slotProps={{textField: {size: 'small'}}}
            val={date.min}
            setValue={(val) => setDate('min', val)}
          />

          <div> -</div>
          <DataPicker
            slotProps={{textField: {size: 'small'}}}
            val={date.max}
            setValue={(val) => setDate('max', val)}
          />

        </Box>
        <Table />
      </div>

    );
  }
}

export default DrawerStore;
