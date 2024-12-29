import {observable, action, computed, set, reaction, toJS, makeObservable, autorun} from 'mobx';

import api from '../../api';
import {alert} from '../Notifications';
import DrawerStoreBase from '../DrawerStoreBase';
import {finishing} from '../../enums';
import translitRuEn from '../../utils/transliter';

class DrawerStore extends DrawerStoreBase {

  @observable arrivals = [];

  constructor(ListStore) {
    super(ListStore);

    makeObservable(this);

    this.getBrands();
  }

  @computed get fields() {
    if (this.ListStore.tab === 'finishing') {
      return {
        'main': [
          {name: 'name', type: 'character varying', title: 'Название', isRequired: true},
          {name: 'img', type: 'mediaDrop', title: 'Фотография'},
          {
            name: 'url',
            type: 'text',
            title: 'Ссылки на фото'
          },
          {
            name: 'type', type: 'select', title: 'Категория',
            values: [
              {value: finishing.MATERIAL, label: 'отделка'},
              {value: finishing.PHOTO, label: 'картинка'},
              {value: finishing.WINDOW, label: 'остекление'}
            ],
            isRequired: true
          },
          {
            name: 'brandId',
            type: 'select',
            title: 'Бренд',
            values: this.brands,
            isRequired: true
          }
        ]
      };
    }

    return {};
  }

  get preparedNewObject() {
    const res = Object.entries(this.card).reduce((result, [key, val]) => {
      if (Array.isArray(val)) {
        result[key] = val.map((item) => item?.value || item);
      } else {
        result[key] = val?.value || val;
      }

      return result;
    }, {});

    return res;
  }

  @action setBrands = (brands) => {
    this.brands = brands;
  };

  checks = () => this.card.img || this.card.url;

  getBrands = async() => {
    try {
      const brands = await api.post('getBrands', {categoryIds: [1]});

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
      await api.post('addFinishing', card);
      this.ListStore.afterRequestSuccess();
    } catch(err) {
      alert(`Ошибка создания: ${err}`);
    }
  };

  edit = async(data) => {
    try {
      if (this.ListStore.tab === 'finishing') {
        await api.post('editFinishing', data);
      }
      this.ListStore.afterRequestSuccess();
    } catch(err) {
      alert({type: 'error', title: 'Ошибка'});
    }
  }

  loadFiled = (files, isMulti) => {
    if (isMulti) {
      return Promise.all(files.map(this.upload));
    }

    return this.upload(files[0]);
  }

  upload = async(file) => {
    const data = new FormData();

    data.append('file', file);
    data.append('alias', translitRuEn(this.card.name) || file.name);
    data.append('dir', 'posts');

    try {
      return await api.post('upload', data);
    } catch(e) {
      console.log(e);

      return null;
    }
  }
}

export default DrawerStore;
