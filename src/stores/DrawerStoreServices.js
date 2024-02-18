import {observable, action, computed, makeObservable} from 'mobx';
import api from '../api';
import {alert} from './Notifications';
import DrawerStoreBase from './DrawerStoreBase';

class DrawerStorePost extends DrawerStoreBase {
  baseFields = [
    {name: 'name', type: 'character varying', title: 'Название', isRequired: true},
    {name: 'order', type: 'integer', title: 'Порядок'}
  ]

  constructor(ListStore) {
    super(ListStore);

    makeObservable(this);
  }

  @computed get fields() {
    return {
      'main': this.baseFields,
      'price': [
        {
          name: 'price',
          type: 'integer',
          title: 'Цена',
          isRequired: true
        },
        {
          name: 'unit',
          type: 'select',
          title: 'Единица',
          values: this.ListStore.priceUnits,
          isRequired: true
        }
      ],
      'media': [
        {
          name: 'img',
          type: 'mediaDrop',
          title: 'Фотография',
          isRequired: true
        }
      ]
    };
  }

  create = async() => {
    const {preparedNewObject: card} = this;

    try {
      await api.post('addService', card);
      this.ListStore.afterRequestSuccess();
    } catch(err) {
      alert(`Ошибка создания: ${err}`);
    }
  };

  edit = async(data) => {
    try {
      await api.post('editServices', data);
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
    data.append('name', this.card.alias);

    try {
      const res = await api.post('upload', data);

      return `https://master-pola.com${res}`;
    } catch(e) {

      return null;
    }
  }
}

export default DrawerStorePost;
