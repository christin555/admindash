import {observable, action, autorun, computed, makeObservable, reaction, toJS} from 'mobx';
import {status as statusEnum} from '../enums';
import api from 'api';
import {alert} from './Notifications';

class ListItemsStore {
    RouterStore;

    @observable status = statusEnum.LOADING;
    @observable list = [];

    @observable initList= [];
    @observable limit = 20;

    ///@observable category = 1;
    @observable isEdit = false;
    @observable isModalShow = false;

    @observable fastfilter;
    @observable fastFilterInput;

    @observable selected;
    @observable deleted = [];
    @observable edited = [];
    @observable actionsData = {};

    @observable ActiveFilterStore = {};
    @observable isModalDeleteShow = false;

    @observable isDrawerShow = false;

    @observable showColumns = {};

    body = {};

    constructor(RouterStore) {
      this.RouterStore = RouterStore;

      makeObservable(this);
    }

    @action setShowColumns = ({field, isVisible}) => {
      this.showColumns[field] = isVisible;
    }

    @action openDrawerWithMode = (mode, values = {}) => {
      this.actionsData = {mode, values};
      this.isDrawerShow = true;
    }

    @action setDrawerShow = (status) => this.isDrawerShow = status;

    @action toggleModalDeleteShow = () => this.isModalDeleteShow = !this.isModalDeleteShow;

    @action setDeleteIds = () => {
      this.deleted.push(...this.selected || []);
      this.toggleModalDeleteShow();

      this.list = this.list.filter(({id}) => !this.deleted.includes(id));
    };

    @action setFastFilter = () => {
      this.fastfilter = this.fastFilterInput;
    };

    @action setFastFilterInput = (fastFilterInput) => {
      this.fastFilterInput = fastFilterInput;
    };

    @action setSelected = (ids) => {
      this.selected = ids;
    };

    @action setLimit = (limit) => {
      if (limit) {
        this.limit = limit;
      }
    };

    @action toggleEdit = () => {
      this.setSelected([]);
      this.updated = [];
      this.deleted = [];
      this.edited = [];
      this.isEdit = !this.isEdit;
    };

    @action showModal = () => {
      this.isModalShow = true;
    };

    @action closeModal = () => {
      this.isModalShow = false;
    };

    @action setStatus = (status) => {
      this.status = status;
    };

    @action reset = () => {
      this.toggleEdit();
      this.list = toJS(this.initList);
    };

    @action setList= (list) => {
      this.list = list;
    };

    @action setInitList = (initList) => {
      this.initList = initList;
    };

    @action save = () => {
      const {deleted} = this;

      deleted.length && this.deleteQuery();

      this.afterSave();
      this.toggleEdit();
    };

    afterSave = () => {}
    deleteQuery = () => {}
    getList = () => {}

    afterRequestSuccess = async() => {
      await this.getList();
      this.initList = toJS(this.list);
      alert({type: 'success', title: 'Успешно обновлено'});
      this.setSelected([]);
    }

    closeStore = () => {
      this.disposer && this.disposer();
    }
}

export {ListItemsStore};
