import {status as statusEnum} from '../../enums';
import api from 'api';
import {ListItemsStore} from '../ListItemsStore';
import {action, autorun, makeObservable, observable} from 'mobx';

class Store extends ListItemsStore {
  DrawerStore;

  constructor(DrawerStore) {
    super();

    this.DrawerStore = DrawerStore;

    this.disposer = autorun(this.getList);

    makeObservable(this);
  }

  getList = async() => {
    if (!this.DrawerStore.card?.code) {
      return;
    }

    this.setStatus(statusEnum.LOADING);

    try {
      const body = {
        date: this.DrawerStore.date,
        fastfilter: this.DrawerStore.card.code
      };

      let list = [];

      if (this.DrawerStore.tab === 'stock') {
        list = await api.post('getLogs', {
          ...body,
          actions: ['addStock', 'removeStock']
        });
      } else if (this.DrawerStore.tab === 'stockArrival') {
        list = await api.post('getArrives', body);
      } else if (this.DrawerStore.tab === 'sales') {
        list = await api.post('getSales', body);
      } else if (this.DrawerStore.tab === 'logs') {
        list = await api.post('getLogs', body);
      }

      this.setList(list);
      this.setInitList(list);
      this.setStatus(statusEnum.SUCCESS);
    } catch(err) {
      this.setStatus(statusEnum.ERROR);
    }
  };
}

export default Store;
