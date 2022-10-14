import {observable, action, autorun, set, makeObservable, computed, toJS} from 'mobx';
import {status as statusEnum} from '../enums';
import api from 'api';


class ProductStore {

    @observable categories;
    @observable category;
    @observable status = statusEnum.LOADING;
    @observable card = {};
    @observable fields;


    constructor(RouterStore, category) {
        this.RouterStore = RouterStore;
        this.category = category;
        makeObservable(this);
        this.getCategories();

        this.getFieldsDisposer = autorun(this.getFields);
    }

    @computed get baseFields() {
       return [
            {
                name: 'categoryId', type: 'select', title: 'Категория',
                values: this.categories,
            },
            {
                name: 'imgs',
                type: 'catalogImgs',
                title: 'Фотографии'
            }
        ]
    }

    @action setValue = (name, value) => {
        set(this.card, {[name]: value});
    };

    @action setFields = (fields) => {
        this.fields = [...this.baseFields, ...fields];
    };

    @action setCategory = (category) => {
        this.category = category;
        this.card['categoryId'] = category;
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
            const fields = await api.post('getFields', {category: category?.value || category});
            this.setFields(fields.sort((a, b) => {
                if (!!a.isRequired === !!b.isRequired) {
                    const textA = a.title?.toUpperCase();
                    const textB = b.title?.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                } else {
                    return (!!a.isRequired < !!b.isRequired) ? 1 : (!!a.isRequired > !!b.isRequired) ? -1 : 0;
                }
            }));
        } catch (err) {
        }
    };


    closeStore() {
        this.getFieldsDisposer();
    }
}

export default ProductStore;
