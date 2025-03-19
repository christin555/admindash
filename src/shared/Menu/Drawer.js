import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import {Link} from 'react-router-dom';
import {inject} from 'mobx-react';
import {Typography} from '@mui/material';

const levelRender = ({id, name, levels, level}) => {
  const Item = (
    <Link to={`/products/${id}`}>
      <Typography
        key={'text'}
        component={'li'}
        variant={level === 1 ? 'subtitle1' : null}
        sx={{fontWeight: level === 1 ? 400 : levels.length ? 350 : 200}}
        margin={'8px 0'}
      >
        {name}
      </Typography>
    </Link>
  );

  if (!levels.length) {
    return Item;
  }

  const SubItems = levels.map(levelRender);

  return (
    <Box>
      {Item}
      <Divider />
      <Box paddingLeft={'20px'}>
        {SubItems}
      </Box>
    </Box>
  );
};

@inject(({RouterStore}) => {
  return {
    categoriesMenu: RouterStore.categoriesMenu
  };
})
class TemporaryDrawer extends React.Component {
  render() {
    const {open, onClose, categoriesMenu} = this.props;

    return (
      <Drawer
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {left: '90px'}
        }}
      >
        <Box
          sx={{width: 600, left: '80px'}}
          role='presentation'
          onClick={onClose}
          display={'flex'}
          padding={'20px 30px'}
        >
          <Box sx={{display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            columnGap: '60px',
            rowGap: '20px'}}
          >
            {
              categoriesMenu.map((level) => {
                const Items = levelRender(level);

                return (
                  <div>
                    <List disablePadding={true}>
                      {Items}
                    </List>
                  </div>
                );
              })
            }
          </Box>

        </Box>
      </Drawer>
    );
  }
}

export default TemporaryDrawer;
