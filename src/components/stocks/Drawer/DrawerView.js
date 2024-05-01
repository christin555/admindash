import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import {Drawer} from '@mui/material';
import Header from './Header';
import Content from './Content';

@inject(({DrawerCardStore, ListStore}) => {
  return {
    isDrawerShow: ListStore.isDrawerCardShow,
    reset: DrawerCardStore.resetCard
  };
})
class DrawerStore extends React.Component {
  render() {
    const {
      isDrawerShow,
      reset
    } = this.props;

    return (
      <Drawer
        anchor={'right'}
        open={isDrawerShow}
        onClose={reset}
      >
        <div className={s.container}>
          <Header />
          <Content />
        </div>
      </Drawer>
    );
  }
}

export default DrawerStore;
