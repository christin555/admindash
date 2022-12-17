import {status as statusEnum} from '../enums';
import api from 'api';
import {alert} from './Notifications';
import {ListItemsStore} from './ListItemsStore';

class CollectionsStore extends ListItemsStore {
    RouterStore;

    deleteQuery = async() => {
      try {
        this.afterRequestSuccess();
      } catch(err) {
        alert({type: 'error', title: 'Ошибка'});
      }
    }

    getList = async() => {
      this.setStatus(statusEnum.LOADING);
      const {fastfilter} = this;

      try {
        const body = {fastfilter};
        const list = await api.post('getCollections', body);

        this.setList(list);
        this.setInitList([]);
        this.setStatus(statusEnum.SUCCESS);
      } catch(err) {
        console.log(err);
        this.setStatus(statusEnum.ERROR);
      }
    };
}

export {CollectionsStore};
