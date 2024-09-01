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
      this.actionsData = {mode: 'show', values: card};
    } else {
      this.actionsData = {};
    }

    this.isDrawerCardShow = status;
  }

  @computed get tab() {
    return this.RouterStore.getKey('tab') || 'finishing';
  }

  @action setTab = (_, tab) => {
    this.RouterStore.history.push(`/catalogs/${tab}`);
  }

  deleteQuery = async() => {
    try {
      const body = {ids: this.deleted};

      if (this.tab === 'finishing') {
        await api.post('deleteFinishing', body);
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

      if (this.tab === 'finishing') {
        list = await api.post('getFinishing', body);
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
