import {observable, action, computed, set, reaction, toJS, makeObservable, autorun} from 'mobx';

import api from '../../api';
import {alert} from '../Notifications';
import DrawerStoreBase from '../DrawerStoreBase';
import dayjs from 'dayjs';

class DrawerStorePost extends DrawerStoreBase {

  @observable arrivals = [];

  constructor(ListStore) {
    super(ListStore);

    makeObservable(this);

    reaction(
      () => this.card.productId,
      this.getArrivals
    );
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
              reservedAmount: 'Зарезервировано',
              price: 'Цена',
              salePrice: 'Цена со скидкой'
            }
          },
          {
            values: this.arrivals,
            name: 'arrivalId',
            type: 'select',
            title: 'От прихода',
            isRequired: false,
            placeholder: 'Ввыберите приход',
            isClearable: true
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
          {name: 'isShipped', type: 'boolean', title: 'Отгружен', isRequired: true,
            tooltip: 'При выборе "да", колво упаков будет списано со склада'},
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

  @action setArrivals = (arrivals) => {
    this.arrivals = arrivals;
  }

  checks = () => {
    const arrival = this.arrivals.find(({value}) => value === this.card.arrivalId);

    if (arrival && (this.card.amount > arrival.available || arrival.available < 0)) {
      alert({type: 'error', title: 'Количество упаковок больше доступного прихода'});

      return false;
    }

    if (this.card.productId?.amount && (this.card.amount > this.card.productId?.amount || this.card.productId?.amount < 0)) {
      alert({type: 'error', title: 'Количество упаковок больше, чем на складе'});

      return false;
    }

    if (this.card.productId?.amount && this.card.amount >= this.card.productId?.amount - this.card.productId?.reservedAmount) {
      alert({type: 'error', title: 'Внимание! Продажа с чужого резерва'});
    }

    return true;
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

  getArrivals = async() => {
    try {
      const res = await api.post('getArrives', {
        id: this.card.productId,
        date: {min: new Date()},
        withAvailableSum: true
      });

      this.setArrivals(res.map(({id, accountNumber, dateArrival, amount, available}) => {
        return {
          value: id,
          amount,
          available,
          label: `Приход от ${accountNumber} от ${dayjs(dateArrival).format('DD.MM.YYYY')}, доступно: ${available}`
        };
      }));
    } catch(err) {
      alert(`Ошибка: ${err}`);
    }
  }
}

export default DrawerStorePost;
