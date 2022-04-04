import {observable, action, autorun, computed, makeObservable, reaction, toJS} from 'mobx';
import {status as statusEnum} from '../enums';
import api from 'api';
import ProductStore from './ProductStore';

class AddStore extends ProductStore{

    constructor(RouterStore) {
        super(RouterStore);
    }


    save = async () => {
        const {preparedNewObject: product} = this;

        try {
            const alias = await api.post('addObject', {product});
            alert(`Успешно, ссылка: https://master-pola.com/product/${alias}`)
            this.RouterStore.history.push('/');

        } catch (err) {
            alert(`Ошибка: ${err}`)
        }
    };

}

export default AddStore;
