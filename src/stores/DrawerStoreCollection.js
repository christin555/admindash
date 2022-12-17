import {observable, action, computed, makeObservable} from 'mobx';

import api from '../api';
import {alert} from './Notifications';
import DrawerStoreBase from './DrawerStoreBase';

class DrawerStorePost extends DrawerStoreBase {
    @observable brands = [];

    baseFields = [
      {name: 'name', type: 'character varying', title: 'Название', isRequired: true}
    ]

    constructor(ListStore) {
      super(ListStore);

      this.getBrands();

      makeObservable(this);
    }

    @computed get fields() {
      const brand = {
        name: 'brandId', type: 'select', title: 'Бренд',
        values: this.brands,
        isRequired: true
      };

      return {'main': [...this.baseFields, brand]};
    }

    @action setBrands = (brands) => {
      this.brands = brands;
    };

    getBrands = async() => {
      try {
        const brands = await api.get('brands/get');

        this.setBrands(brands.map(({id, name}) => {
          return {value: id, label: name};
        }));
      } catch(err) {
        console.log(err);
      }
    };

    create = async() => {
      const {preparedNewObject: card} = this;

      try {
        await api.post('addCollection', card);
        this.ListStore.afterRequestSuccess();
      } catch(err) {
        alert(`Ошибка создания: ${err}`);
      }
    };

    edit = async(data) => {
      try {
        await api.post('editPosts', data);
        this.ListStore.afterRequestSuccess();
      } catch(err) {
        alert({type: 'error', title: 'Ошибка'});
      }
    }

}

export default DrawerStorePost;
