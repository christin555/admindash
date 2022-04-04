import {observable, action, autorun, computed, makeObservable, reaction, toJS} from 'mobx';
import ProductStore from './ProductStore';
import api from "../api";
import {alert} from "./Notifications";

class AddStore extends ProductStore {
    @observable mode;

    constructor(ProductsStore) {
        super(ProductsStore.RouterStore);

        this.ProductsStore = ProductsStore;

        reaction(
            () => this.ProductsStore.actionsData,
            this.setActions
        )
    }

    get selected() {
        return this.ProductsStore.selected;
    }

    get preparedObject() {
        return Object.entries(this.product).reduce((res, [key, val]) => {
                res[key] = val?.value || val;
                return res;
            }, {}
        )
    }

    @action setActions = () => {
        this.mode = this.ProductsStore.actionsData.mode;

        if (this.mode === 'show' || this.mode === 'edit') {
            this.product = {...this.ProductsStore.actionsData.values};
            this.category = this.product.categoryId;
        }

        if (this.mode === 'copy') {
            this.product = {...this.ProductsStore.actionsData.values};
            delete this.product.id;
            delete this.product.name;
            this.category = this.product.categoryId;
        }
    }

    @action apply = () => {
        if (this.mode === 'edit') {
            this.edit({ids: [this.product.id], data: this.preparedObject});
        }

        if (this.mode === 'massedit') {
            this.edit({ids: this.selected, data: this.preparedObject});
        }

        if (this.mode === 'copy') {
            this.create();
        }

        this.reset();
    }

    get preparedNewObject() {
        const res = Object.entries(this.product).reduce((res, [key, val]) => {
                res[key] = val?.value || val;
                return res;
            }, {}
        )

        res._collection = this.product.collectionId.label;
        res._category = this.product.categoryId.label;

        return res;
    }

    create = async () => {
        const {preparedNewObject: product} = this;

        try {
            await api.post('addObject', {product});
            this.ProductsStore.afterRequestSuccess()
        } catch (err) {
            alert(`Ошибка создания: ${err}`)
        }
    };

    edit = async (data) => {
        try {
            await api.post('editProducts', data);
            this.ProductsStore.afterRequestSuccess();
        } catch (err) {
            alert({type: 'error', title: 'Ошибка'});
        }
    }

    @action reset = () => {
        this.product = {};
        this.mode = null;
        this.ProductsStore.actionsData = {};
        this.ProductsStore.setDrawerShow(false);
    }
}

export default AddStore;
