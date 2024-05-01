import {observable, action, computed, set, reaction, toJS, makeObservable} from 'mobx';

import DrawerStoreBase from '../DrawerStoreBase';
import DrawerTableStore from './DrowerTableStore';

class DrawerStorePost extends DrawerStoreBase {
  @observable tab = 'stock';

  @observable date = {min: null, max: null};

  constructor(ListStore) {
    super(ListStore);

    this.TableStore = new DrawerTableStore(this);

    makeObservable(this);
  }

  @action resetCard = () => {
    this.ListStore.setDrawerCardShow(false);

    this.card = {};
    this.oldCard = {};
    this.mode = null;
    this.ListStore.actionsData = {};
  }

  @action setDate = (prop, val) => {
    this.date = {...this.date, [prop]: val};
  }

  @action setTab = (_, tab) => {
    this.tab = tab;
  }
}

export default DrawerStorePost;
