import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import {toJS} from 'mobx';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material';
import Tabs, {tabsClasses} from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from './Table';
import DataPicker from '../../../shared/DataPicker';

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

    const blocks = card.next ? card.next.map(({dateArrival, amount}) => (
      <div key={`${dateArrival}_${amount}`}>
        <span className={s.dateArrival}> {dateArrival}</span>, {amount} уп.
      </div>
    )) : null;

    return (
      <div className={s.fields}>
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

        <div className={s.prices}>
          {salePrice}
          {price}
        </div>

        <Box display={'flex'} flexDirection={'row'} alignItems={'flex-start'} gap={'300px'}>
          <div className={s.fieldName}> В наличии: {card.amount} уп.</div>

          <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
            <Box fontWeight={400}>Ожидается:</Box>
            {blocks}
          </Box>
        </Box>

        <Box margin={'20px 0'} sx={{borderBottom: 1, borderColor: 'divider'}}>
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

          <div> - </div>
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
