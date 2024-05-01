import {observable, action, computed, set, reaction, toJS, makeObservable} from 'mobx';

import api from '../../api';
import {alert} from '../Notifications';
import DrawerStoreBase from '../DrawerStoreBase';

class DrawerStorePost extends DrawerStoreBase {
  constructor(ListStore) {
    super(ListStore);

    makeObservable(this);
  }

  @computed get fields() {
    if (this.ListStore.tab === 'sales') {
      return {
        'main': [
          {
            search: this.searchProduct,
            name: 'productId',
            type: 'searchSelect',
            title: 'Товар',
            isRequired: true,
            placeholder: 'Введите код или наименование',
            additionals: {
              amount: 'В наличии на складе',
              price: 'Цена',
              salePrice: 'Цена со скидкой'
            }
          },
          {
            name: 'saleDate',
            type: 'date',
            title: 'Дата продажи',
            isRequired: true,
            default: new Date()
          },
          {name: 'amount', type: 'integer', title: 'Колво упаковок', isRequired: true},
          {name: 'client', type: 'character varying', title: 'Клиент', isRequired: true},
          {name: 'shippingDate', type: 'date', title: 'Дата отгрузки', isRequired: true, default: new Date()},
          {name: 'isShipped', type: 'boolean', title: 'Отгружен', isRequired: true, default: true},
          {name: 'price', type: 'integer', title: 'Стоимость'},
          {name: 'notes', type: 'text', title: 'Заметки'}
        ]
      };
    }

    return {
      'main': [
        {
          search: this.searchProduct,
          name: 'productId',
          type: 'searchSelect',
          title: 'Товар',
          isRequired: true,
          placeholder: 'Введите код или наименование'
        },
        {
          name: 'dateArrival',
          type: 'date',
          title: 'Дата прихода',
          isRequired: true,
          default: new Date()
        },
        {name: 'amount', type: 'integer', title: 'Колво упаковок', isRequired: true},
        {name: 'accountNumber', type: 'character varying', title: 'Номер счета', isRequired: true},
        {name: 'isReceived', type: 'boolean', title: 'Получен', isRequired: true},
        {name: 'notes', type: 'text', title: 'Заметки'}
      ]
    };
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

  create = async() => {
    const {preparedNewObject: card} = this;

    try {
      if (this.ListStore.tab === 'sales') {
        await api.post('addSale', card);
      } else {
        await api.post('addArrival', card);
      }

      this.ListStore.afterRequestSuccess();
    } catch(err) {
      alert(`Ошибка создания: ${err}`);
    }
  };

  edit = async(data) => {
    try {
      if (this.ListStore.tab === 'sales') {
        await api.post('editSale', data);
      } else {
        await api.post('editArrival', data);
      }
      this.ListStore.afterRequestSuccess();
    } catch(err) {
      alert({type: 'error', title: 'Ошибка'});
    }
  }

  searchProduct = async(fastfilter) => {
    try {
      const res = await api.post('getProduct', {fastfilter});

      return res;
    } catch(err) {
      alert(`Ошибка: ${err}`);
    }
  }

}

export default DrawerStorePost;
