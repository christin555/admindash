import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import {IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

@inject(({DrawerCardStore}) => {
  return {
    reset: DrawerCardStore.resetCard
  };
})
class Header extends React.Component {
  render() {
    const {
      reset
    } = this.props;

    return (
      <div className={s.header}>
        <Typography variant={'button'}>Просмотр
        </Typography>
        <IconButton
          onClick={reset}
        >
          <CloseIcon />
        </IconButton>
      </div>

    );
  }
}

export default Header;
