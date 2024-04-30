import {status as statusEnum} from '../enums';
import api from 'api';
import {alert} from './Notifications';
import {ListItemsStore} from './ListItemsStore';
import {action, observable} from 'mobx';
import {array2Object} from '../utils';

class ServicesStore extends ListItemsStore {
  RouterStore;

  @observable priceUnits = [];
  @observable priceUnitGrouped = {};

  constructor(RouterStore) {
    super(RouterStore);
    this.getList();
  }

  @action setPriceUnits = (units) => {
    this.priceUnits = units;
    this.priceUnitGrouped = array2Object(units, 'value');
  };

  getPriceUnits = async() => {
    try {
      const units = await api.get('getUnits');

      this.setPriceUnits(units.map(({id, name}) => {
        return {value: id, label: name};
      }));
    } catch(err) {
      alert({type: 'error', title: 'Ошибка получения единиц цен'});
    }
  };

  deleteQuery = async() => {
    try {
      await api.post('deleteServices', {ids: this.deleted});
      this.afterRequestSuccess();
    } catch(err) {
      alert({type: 'error', title: 'Ошибка'});
    }
  }

  getList = async() => {
    this.setStatus(statusEnum.LOADING);
    const {fastfilter} = this;

    try {
      await this.getPriceUnits();

      const body = {fastfilter, withMedia: true, withRelations: true};
      const list = await api.post('getServices', body);

      this.setList(list);
      this.setInitList(list);
      this.setStatus(statusEnum.SUCCESS);
    } catch(err) {
      this.setStatus(statusEnum.ERROR);
    }
  };
}

export {ServicesStore};
