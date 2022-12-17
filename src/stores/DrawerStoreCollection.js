import {observable, action, computed, makeObservable} from 'mobx';

import api from '../api';
import {alert} from './Notifications';
import DrawerStoreBase from './DrawerStoreBase';

class DrawerStorePost extends DrawerStoreBase {
    @observable categories = [];
    @observable brands = [];

    baseFields = [
      {name: 'name', type: 'character varying', title: 'Название', isRequired: true}
    ]

    constructor(ListStore) {
      super(ListStore);

      this.getBrands();
      this.getCategories();

      makeObservable(this);
    }

    @computed get fields() {
      const categories = {
        name: 'categoryIds', type: 'multiselect', title: 'Категория',
        values: this.categories,
        isRequired: false
      };
      const brand = {
        name: 'brandId', type: 'select', title: 'Бренд',
        values: this.brands,
        isRequired: true
      };

      return {'main': [...this.baseFields, brand, categories]};
    }

    @action setBrands = (brands) => {
      this.brands = brands;
    };

    @action setCategories = (categories) => {
      this.categories = categories;
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

    getCategories = async() => {
      try {
        const categories = await api.get('categories/get');

        this.setCategories(categories.map(({id, name}) => {
          return {value: id, label: name};
        }));
      } catch(err) {
        console.log(err);
      }
    };

    create = async() => {
      const {preparedNewObject: card} = this;

      console.log('create', card);
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
