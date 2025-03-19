import api from 'api';
import {action, autorun, computed, makeObservable, observable} from 'mobx';
import {alert} from './Notifications';

export class FilterStore {
  ProductsStore;
  RouterStore;

  @observable fields = [];
  @observable isOpen = false;
  @observable values = {};
  oldValues = {};

  disposers= [];

  constructor(RouterStore, ProductsStore) {
    this.RouterStore = RouterStore;
    this.ProductsStore = ProductsStore;

    makeObservable(this);

    this.disposers.push(autorun(this.getFields));
  }

  @computed get category() {
    return Number(this.RouterStore.getKey('category')) || 1;
  }

  @action setFields = (fields) => {
    this.fields = fields;
  };

  @action setValue = (key, val) => {
    this.values[key] = val;
  };

  @action setOpen = (isOpen) => {
    this.isOpen = isOpen;
  };

  setOldValues = (values) => {
    this.oldValues = values;
  };

   getFields = async() => {
     try {
       const {category: categoryId} = this;

       const fields = await api.post('catalog/getFilterFields', {categoryId});

       this.setFields(fields);

     } catch(e) {
       console.log(e);
       alert({type: 'error', title: 'Ошибка при получении фильтра'});
     }
   }

   apply = () => {
     this.setOldValues = this.values;
     this.ProductsStore.getList(this.values);
     this.setOpen(false);
   }

   reset = () => {
     this.values = {};
     this.setOldValues = {};
     this.ProductsStore.getList({});

     this.setOpen(false);
   }

   closeStore() {
     this.disposers.map((func) => func());
   }
}

export default FilterStore;