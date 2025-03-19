import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {inject} from 'mobx-react';
import FieldsView from './Base/FieldsView';
import Button from '@mui/material/Button';

@inject(({FilterStore}) => {
  return {
    fields: FilterStore.fields,
    isOpen: FilterStore.isOpen,
    setOpen: FilterStore.setOpen,
    apply: FilterStore.apply,
    reset: FilterStore.reset
  };
})

class FilterDrawer extends React.Component {
  render() {
    const {isOpen, setOpen, apply, reset} = this.props;

    return (
      <Drawer
        anchor={'right'}
        open={isOpen}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{width: 800}}
          role='presentation'
          height={'100%'}
          display={'flex'}
          flexDirection={'column'}
        >
          <Box
            display={'flex'}
            flexDirection={'column'}
            padding={'20px 30px'}
            gap={'20px'}
            height={'100%'}
          >
            <FieldsView />
          </Box>
          <Box
            display={'flex'}
            margin={'20px'}
            gap={'20px'}
            justifyContent={'flex-end'}
          >
            <Button
              variant={'contained'}
              onClick={reset}
              color={'secondary'}
            > Сбросить
            </Button>
            <Button
              variant={'contained'}
              onClick={apply}
            > Применить
            </Button>
          </Box>
        </Box>
      </Drawer>
    );
  }
}

export default FilterDrawer;
