import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {AppBar} from '@mui/material';
import {toJS} from 'mobx';
import ModalDelete from '../listComponetns/ModalDelete';

@inject(({ListStore}) => {
  return {
    selected: toJS(ListStore.selected),
    isEdit: ListStore.isEdit,
    openDrawerWithMode: ListStore.openDrawerWithMode,
    toggleModalDeleteShow: ListStore.toggleModalDeleteShow,
    ListStore
  };
})
class Footer extends React.Component {
    openDrawer = () => this.props.openDrawerWithMode('massedit', this.props.selected)

    render() {
      const {
        selected,
        isEdit,
        toggleModalDeleteShow
      } = this.props;

      return (
        <React.Fragment>
          {
            selected?.length && isEdit && (
              <AppBar className={s.bar} position='sticky'>
                <Button
                  variant={'contained'}
                  onClick={toggleModalDeleteShow}
                  color={'secondary'}
                > Удалить товары
                </Button>

                <Box> Выбрано {selected?.length} строки </Box>
              </AppBar>
            ) ||
                    null
          }
          <ModalDelete />
        </React.Fragment>
      );
    }
}

export default Footer;
