import React from 'react';
import {inject} from 'mobx-react';
import {toJS} from 'mobx';
import Tabs, {tabsClasses} from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

@inject(({StocksStore}) => {
  return {
    tab: StocksStore.tab,
    setTab: StocksStore.setTab
  };
})
class Header extends React.Component {
  render() {
    const {
      tab,
      setTab
    } = this.props;
    return (
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
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
            label={'В наличии'}
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
            label={'История'}
          />
        </Tabs>
      </Box>
    );
  }
}

export default Header;
