import {status as statusEnum} from '../enums';
import api from 'api';
import {alert} from './Notifications';
import {ListItemsStore} from './ListItemsStore';
import {action, autorun, computed, makeObservable, observable} from 'mobx';

class Store extends ListItemsStore {
  RouterStore;
  @observable isDrawerCardShow = false;

  constructor(RouterStore) {
    super(RouterStore);

    this.disposer = autorun(this.getList);

    makeObservable(this);
  }

  @action setDrawerCardShow = (status, card) => {
    this.isDrawerCardShow = status;

    if (status) {
      this.actionsData = {mode: 'show', values: card};
    } else {
      this.actionsData = {};
    }
  }

  @computed get tab() {
    return this.RouterStore.getKey('tab') || 'stock';
  }

  @action setTab = (_, tab) => {
    this.RouterStore.history.push(`/stocks/${tab}`);
  }

  deleteQuery = async() => {
    try {
      const body = {ids: this.deleted};

      if (this.tab === 'stockArrival') {
        await api.post('deleteArrival', body);
      } else if (this.tab === 'sales') {
        await api.post('deleteSale', body);
      }

      this.afterRequestSuccess();
    } catch(err) {
      alert({type: 'error', title: 'Ошибка'});
    }
  }

  getList = async() => {
    this.setStatus(statusEnum.LOADING);
    const {fastfilter} = this;

    try {
      const body = {fastfilter};

      let list = [];

      if (this.tab === 'stock') {
        list = await api.post('getStocks', body);
      } else if (this.tab === 'stockArrival') {
        list = await api.post('getArrives', body);
      } else if (this.tab === 'sales') {
        list = await api.post('getSales', body);
      } else if (this.tab === 'logs') {
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
