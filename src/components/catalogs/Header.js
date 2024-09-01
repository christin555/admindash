import React from 'react';
import {inject} from 'mobx-react';
import Tabs, {tabsClasses} from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

@inject(({ListStore}) => {
  return {
    tab: ListStore.tab,
    setTab: ListStore.setTab
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
            key={'finishing'}
            value={'finishing'}
            label={'Отделка и остекление дверей'}
          />
        </Tabs>
      </Box>
    );
  }
}

export default Header;
