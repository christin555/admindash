import {observable, action, autorun, computed, makeObservable, reaction, toJS} from 'mobx';
import {status as statusEnum} from '../enums';
import api from 'api';
import {alert} from './Notifications';
import {ListItemsStore} from "./ListItemsStore";

class PostsStore extends ListItemsStore {
    RouterStore;

    constructor(RouterStore) {
        super(RouterStore);
        this.getList();
    }


    deleteQuery = async () => {
        try {
            await api.post('deletePosts', {ids: this.deleted});
            this.afterRequestSuccess();
        } catch (err) {
            alert({type: 'error', title: 'Ошибка'});
        }
    }

    getList = async () => {
        this.setStatus(statusEnum.LOADING);
        const {fastfilter} = this;

        try {
            const body = {fastfilter, withMedia: true};
            const list = await api.post('getPosts', body);

            this.setList(list);
            this.setInitList(list);
            this.setStatus(statusEnum.SUCCESS);
        } catch (err) {
            this.setStatus(statusEnum.ERROR);
        }
    };
}

export {PostsStore};
