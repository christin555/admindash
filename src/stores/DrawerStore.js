import {observable, action, autorun, computed, set, reaction, toJS} from 'mobx';
import ProductStore from './ProductStore';
import api from "../api";
import {alert} from "./Notifications";

class DrawerStore extends ProductStore {
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
        this.category = this.ProductsStore.category;

        if (this.mode === 'show' || this.mode === 'edit') {
            this.product = toJS(this.ProductsStore.actionsData.values);
        }

        if (this.mode === 'copy') {
            this.product = toJS(this.ProductsStore.actionsData.values);
            delete this.product.id;
            delete this.product.name;
            delete this.product.imgs;
        }
    }

    @action reset = () => {
        this.product = {};
        this.mode = null;
        this.ProductsStore.actionsData = {};
        this.ProductsStore.setDrawerShow(false);
    }

    @action apply = () => {
        if (this.mode === 'edit') {
            this.edit({ids: [this.product.id], data: this.preparedObject});
        }

        if (this.mode === 'massedit') {
            this.edit({ids: this.selected, data: this.preparedObject});
        }

        if (this.mode === 'copy' || this.mode === 'add') {
            this.create();
        }

        this.reset();
    }

    @action setMainPhoto = (src) => {
        this.setValue('imgs', toJS(this.product.imgs).map((item) => {
            if (src === item.src) {
                item.isMain = true;
            } else {
                item.isMain = false;
            }

            return item
        }))
    }

    @action deletePhoto = (src) => {
        this.setValue('imgs', toJS(this.product.imgs).filter((item) => src !== item.src))
    }

    get preparedNewObject() {
        const res = Object.entries(this.product).reduce((res, [key, val]) => {
                res[key] = val?.value || val;
                return res;
            }, {}
        )

        res._collection = this.product.collectionId?.label || this.product.collection;
        res._category = this.product.categoryId?.label || this.product.category;

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

    loadFiled = async (files) => {
        files.map(async(file) => {
            const data = new FormData();
            data.append('file', file);
            data.append('name', this.product.alias);

            try {
                const file = await api.post('upload', data);

                if (!this.product.imgs) {
                    this.product.imgs = [{src: file}];
                } else this.product.imgs.push({src: file});

            } catch (e) {
                console.log(e);
            }
        })

    }
}

export default DrawerStore;
