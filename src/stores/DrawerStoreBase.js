import {observable, action, set, reaction, toJS, makeObservable} from 'mobx';
import {status as statusEnum} from '../enums';
import {alert} from './Notifications';

class DrawerStoreBase {
  @observable mode;
  @observable status = statusEnum.LOADING;
  @observable card = {};

  oldCard = {}

  baseFields = []

  constructor(ListStore) {
    this.ListStore = ListStore;

    reaction(
      () => this.ListStore.actionsData,
      this.setActions
    );

    makeObservable(this);
  }

  get selected() {
    return this.ListStore.selected;
  }

  get preparedObject() {
    return Object.entries(this.card).reduce((res, [key, val]) => {
      const value = val?.value || val;

      if (value && this.oldCard[key] !== value) {
        res[key] = val;
      }

      return res;
    }, {});
  }

  @action setActions = () => {
    this.mode = this.ListStore.actionsData.mode;

    if (this.mode === 'show' || this.mode === 'edit') {
      this.oldCard = toJS(this.ListStore.actionsData.values);
      this.card = toJS(this.ListStore.actionsData.values);
    }

    if (this.mode === 'copy') {
      this.card = toJS(this.ListStore.actionsData.values);
      delete this.card.id;
      delete this.card.name;
      delete this.card.imgs;
    }

    this.modifyCard && this.modifyCard();
  }

  @action reset = () => {
    this.card = {};
    this.oldCard = {};
    this.mediaUpdated = false;
    this.mode = null;
    this.ListStore.actionsData = {};
    this.ListStore.setDrawerShow(false);
  }

  failReq = () => Object.values(this.fields).flat()
    .some(({isRequired, name}) => isRequired && !this.card[name])

  @action apply = () => {
    if (this.mode === 'edit') {
      if (this.failReq()) {
        alert({type: 'error', title: 'Заполните обязательные поля'});

        return;
      }

      this.edit({ids: [this.card.id], data: this.preparedObject});
    }

    if (this.mode === 'massedit') {
      this.edit({ids: this.selected, data: this.preparedObject});
    }

    if (this.mode === 'add') {

      if (this.failReq()) {
        alert({type: 'error', title: 'Заполните обязательные поля'});

        return;
      }

      this.create();
    }

    if (this.mode === 'copy') {
      this.create();
    }

    this.reset();
  }

  @action setValue = (name, value) => {
    if (name === 'articleType') {
      set(this.card, {media: null});
    }

    if (name === 'media') {
      this.mediaUpdated = true;
    }

    set(this.card, {[name]: value});
  };

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

}

export default DrawerStoreBase;
