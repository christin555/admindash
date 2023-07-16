import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {AppBar} from '@mui/material';
import Modal from './Modal';
import {toJS} from 'mobx';
import ModalDelete from './ModalDelete';

@inject(({ProductsStore}) => {
  return {
    selected: toJS(ProductsStore.selected),
    showModal: ProductsStore.showModal,
    isEdit: ProductsStore.isEdit,
    openDrawerWithMode: ProductsStore.openDrawerWithMode,
    toggleModalDeleteShow: ProductsStore.toggleModalDeleteShow,
    filter: ProductsStore.filter,
    setShowOnSite: ProductsStore.setShowOnSite
  };
})
class PriceView extends React.Component {
  openDrawer = () => this.props.openDrawerWithMode('massedit', this.props.selected)

  render() {
    const {
      selected,
      showModal,
      isEdit,
      toggleModalDeleteShow,
      filter,
      setShowOnSite
    } = this.props;

    return (
      <React.Fragment>
        {
          selected?.length && isEdit && (
            <AppBar className={s.bar} position='sticky'>

              {
                filter.showOnSite === false ? (
                  <Button
                    variant={'contained'}
                    onClick={() => setShowOnSite(true)}
                    color={'primary'}
                  > Показывать на сайте
                  </Button>
                ) :
                  (
                    <Button
                      variant={'contained'}
                      onClick={() => setShowOnSite(false)}
                      color={'primary'}
                    > Скрыть с сайта
                    </Button>
                  )
              }
              <Button
                variant={'contained'}
                onClick={toggleModalDeleteShow}
                color={'secondary'}
              > Удалить товары
              </Button>

              <Button
                variant={'contained'}
                onClick={showModal}
              > Изменить цену
              </Button>

              <Button
                variant={'contained'}
                onClick={this.openDrawer}
              > Массовое редактирование
              </Button>

              <Box> Выбрано {selected?.length} строки </Box>
            </AppBar>
          ) ||
          null
        }
        <Modal />
        <ModalDelete />
      </React.Fragment>
    );
  }
}

export default PriceView;
