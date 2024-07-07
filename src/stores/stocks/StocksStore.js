import {status as statusEnum} from '../../enums';
import api from 'api';
import {alert} from '../Notifications';
import {ListItemsStore} from '../ListItemsStore';
import {action, autorun, computed, makeObservable, observable} from 'mobx';

class Store extends ListItemsStore {
  RouterStore;
  @observable isDrawerCardShow = false;
  @observable date = {min: null, max: null}
  @observable filter = {
    stock: {},
    stockArrival: {},
    sales: {},
    logs: {}
  };

  constructor(RouterStore) {
    super(RouterStore);
    makeObservable(this);

    this.disposer = autorun(this.getList);
  }

  @computed get filterTab() {
    return this.filter[this.tab] || {};
  }

  @action setDate = (prop, val) => {
    this.date = {...this.date, [prop]: val};
  }

  @action setFilter = (prop, val) => {
    this.filter = {
      ...this.filter,
      [this.tab]: {...this.filterTab, [prop]: val}
    };
  }

  @action setDrawerCardShow = async(status, card) => {
    if (status) {
      const stock = await this.getStockProduct(card);

      this.actionsData = {mode: 'show', values: stock};
    } else {
      this.actionsData = {};
    }

    this.isDrawerCardShow = status;
  }

  @computed get tab() {
    return this.RouterStore.getKey('tab') || 'stock';
  }

  @action setTab = (_, tab) => {
    this.RouterStore.history.push(`/stocks/${tab}`);
  }

  getStockProduct = async(card) => {
    const body = {id: card.code};

    try {
      const [stock] = await api.post('getStocks', body);

      return stock;
    } catch(err) {
      alert({type: 'error', title: 'Ошибка'});
    }
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
    const {fastfilter, date, filterTab} = this;

    try {
      const body = {fastfilter, date, ...filterTab};

      let list = [];

      if (this.tab === 'stock') {
        list = await api.post('getStocks', body);
      } else if (this.tab === 'stockArrival') {
        list = await api.post('getArrives', {...body, withReservedData: true});
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
