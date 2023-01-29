import {autorun} from 'mobx';
import {status as statusEnum} from '../enums';
import api from 'api';
import {ListItemsStore} from './ListItemsStore';

class CallStore extends ListItemsStore {
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
      const list = await api.post('getCalls', body);

      this.setList(list);
      this.setInitList([]);
      this.setStatus(statusEnum.SUCCESS);
    } catch(err) {
      console.log(err);
      this.setStatus(statusEnum.ERROR);
    }
  };
}

export default CallStore;
