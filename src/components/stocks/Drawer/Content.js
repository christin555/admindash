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
import metersCount from '../metersCount';

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

    const metersInPackage = (
      <span>
        <span className={s.title}>В уп: </span>
        {card.metersInPackage ? `${card.metersInPackage} м²` : '-'}
      </span>
    );

    const salePrice = (
      <span>
        <span className={s.title}>Цена со скидкой: </span>
        {card.salePrice ? ` ${card.salePrice.toLocaleString('ru')} руб/м²` : 'без скидки'}
      </span>
    );

    const price = (
      <span>
        <span className={s.title}> Цена: </span>
        {card.price ? `${card.price.toLocaleString('ru')} руб/м²` : '-'}
      </span>
    );

    const code = (
      <span>
        <span className={s.title}> арт: </span>
        {card.code}
      </span>
    );

    const allAwaits = card.awaits?.reduce((acc, {amount}) => acc + amount, 0) || 0;
    const allArrives = card.next?.reduce((acc, {amount}) => acc + amount, 0) || 0;

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
            <div className={s.code}>
              {code} | {metersInPackage} | {salePrice} | {price}
            </div>
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

        <Box display={'flex'} flexDirection={'row'} alignItems={'flex-start'} gap={'160px'}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'20px'}>
            <Box alignItems={'center'} display={'flex'} className={s.fieldName} gap={'6px'}>
            На складе для продажи: {metersCount({
                amount: card.amount - card.reservedAmount,
                metersInPackage: card.metersInPackage
              })}
              <Tooltip title='Со склада учетом хранения'>
                <HelpIcon fontSize={'10px'} />
              </Tooltip>
            </Box>
            <Box alignItems={'center'} display={'flex'} className={s.fieldNameAll} gap={'6px'}>
            На складе всего: {metersCount({
                amount: card.amount,
                metersInPackage: card.metersInPackage
              })}
              <Tooltip title='По факту'>
                <HelpIcon fontSize={'10px'} />
              </Tooltip>
            </Box>
          </Box>

          <Box display={'flex'} flexDirection={'column'} gap={'10px'} fontWeight={400}>
            <Box fontWeight={450}>Ожидается: {allArrives} уп</Box>
            {blocks}
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={'10px'} fontWeight={400}>
            <Box fontWeight={450}>На хранении: {allAwaits} уп</Box>
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
