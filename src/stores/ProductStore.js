import {observable, action, autorun, computed, makeObservable, reaction, toJS} from 'mobx';
import {status as statusEnum} from '../enums';
import api from 'api';

class ProductStore {

    @observable categories;
    @observable category;
    @observable status = statusEnum.LOADING;
    @observable product = {};
    @observable fields;

    constructor(RouterStore) {
        makeObservable(this);
        this.getCategories();

        this.getFieldsDisposer = autorun(this.getFields);
    }

    @action setValue = (name, value) => {
        this.product[name] = value;
    };

    @action setFields = (fields) => {
        this.fields = fields;
    };

    @action setCategory = (category) => {
        console.log('setCategory');
        this.category = category;
        this.product['categoryId'] = category;
    };

    @action setCategories = (categories) => {
        this.categories = categories;
    };

    getCategories = async () => {
        try {
            const categories = await api.get('categories/get');
            this.setCategories(categories.map(({id, name}) => {
                    return {value: id, label: name}
                }
            ))
        } catch (err) {
            console.log(err)

        }
    };

    getFields = async () => {
        const {category} = this;

        try {
            const fields = await api.post('getFields', {category: category?.value});
            this.setFields(fields);
        } catch (err) {
        }
    };

    get preparedObject() {
        const res = Object.entries(this.product).reduce((res, [key, val]) => {
                res[key] = val?.value || val;
                return res;
            }, {}
        )

        res._collection = this.product.collectionId.label;
        res._category = this.product.categoryId.label;

        return res;
    }


    save = async () => {
        const {preparedObject: product} = this;

        try {
            console.log(product)
            const fields = await api.post('addObject', {product});
        } catch (err) {
        }
    };

    closeStore() {
        this.getFieldsDisposer();
    }
}

export default ProductStore;
