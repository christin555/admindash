import {status as statusEnum} from '../enums';
import api from 'api';
import {alert} from './Notifications';
import {ListItemsStore} from './ListItemsStore';
import {autorun} from 'mobx';

class UpdatesStore extends ListItemsStore {
  RouterStore;

  constructor(RouterStore) {
    super(RouterStore);

    this.disposer = autorun(this.getList);
  }

  getList = async() => {
    this.setStatus(statusEnum.LOADING);
    const {fastfilter} = this;

    try {
      const body = {fastfilter};
      const list = await api.post('getRefreshLogs', body);

      this.setList(list);
      this.setInitList([]);
      this.setStatus(statusEnum.SUCCESS);
    } catch(err) {
      console.log(err);
      this.setStatus(statusEnum.ERROR);
    }
  };
}

export {UpdatesStore};
