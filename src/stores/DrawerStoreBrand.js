import {observable, action, computed, makeObservable} from 'mobx';
import api from '../api';
import {alert} from './Notifications';
import DrawerStoreBase from './DrawerStoreBase';

class DrawerStorePost extends DrawerStoreBase {
    @observable categories = [];
    @observable brands = [];

    baseFields = [
      {name: 'name', type: 'character varying', title: 'Название', isRequired: true},
      {name: 'weight', type: 'integer', title: 'Порядок'}
    ]

    constructor(ListStore) {
      super(ListStore);

      this.getCategories();

      makeObservable(this);
    }

    @computed get fields() {
      const categories = {
        name: 'categoryId', type: 'select', title: 'Категория',
        values: this.categories,
        isRequired: false
      };

      return {'main': [...this.baseFields, categories]};
    }

    @action setCategories = (categories) => {
      this.categories = categories;
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

      try {
        await api.post('addBrand', card);
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
