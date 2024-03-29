import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import {IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

@inject(({DrawerStore}) => {
  return {
    reset: DrawerStore.reset,
    mode: DrawerStore.mode
  };
})
class Header extends React.Component {
  render() {
    const {
      reset,
      mode
    } = this.props;

    return (
      <div className={s.header}>
        <Typography variant={'button'}>
          {
            mode === 'show' ? 'Просмотр' : mode === 'add' ? 'Создание' :
              mode === 'edit' ? `Редактирование` :
                mode === 'massedit' ? `Массовое редактирование` :
                  mode === 'copy' ? `Копия` : null
          }
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
