import {observable, action, autorun, computed, makeObservable, reaction, toJS} from 'mobx';
import {status as statusEnum} from '../enums';
import api from 'api';

class PriceStore {

    @observable status = statusEnum.LOADING;
    @observable categories;
    @observable products = [];
    @observable initProducts = [];
    @observable limit = 20;

    @observable category = 1;
    @observable isEdit = false;
    @observable isModalShow = false;
    @observable checkedPrice;

    @observable hierarchy;
    @observable fastfilter;
    @observable fastFilterInput;
    @observable isLastLevel;
    @observable count = 0;
    @observable isHydrating;

    @observable selected;
    @observable deleted = [];
    @observable ActiveFilterStore = {};
    @observable isModalDeleteShow = false;

    body = {};

    constructor(RouterStore) {
        makeObservable(this);
        this.getCategories();
        this.getCatalogDisposer = autorun(this.getCatalog);
    }


    @action toggleModalDeleteShow = () => {
        this.isModalDeleteShow = !this.isModalDeleteShow;
    };

    @action setDeleteIds = () => {
        this.deleted.push(...(this.selected || []));
        this.toggleModalDeleteShow();

        this.products = this.products.filter(({id}) => !this.deleted.includes((id)))
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
        if(limit){
            this.limit = limit;
        }
    };

    @action toggleEdit = () => {
        this.setSelected([]);
        this.updated = [];
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

    @action setCategory = (_, category) => {
        this.category = category;
    };

    @action reset = () => {
        this.toggleEdit();
        this.products = toJS(this.initProducts);
    };

    @action setPrice = (_id, price) => {
        const pr = this.products.find(({id}) => id === _id);
        pr['price'] = price;
    };

    @action setPriceChecked = (price) => {
        this.checkedPrice = price;
    };

    @action updatePrices = () => {
        this.products.forEach((product) => {
            if (this.selected.includes(product.id)) {
                product.price = this.checkedPrice
            }
        })

        this.closeModal();
        this.setPriceChecked('')
    }

    @action setProducts = (products) => {
        this.products = products;
    };

    @action setInitProducts = (initProducts) => {
        this.initProducts = initProducts;
    };

    @action setCategories = (categories) => {
        this.categories = categories;
    };

    @action save = () => {
        const {products, initProducts} = this;

        const updated = [];
        initProducts.forEach(({id, price}) =>{
            const item = products.find(({id: _id}) => id === _id);

            if(item && item.price !== price){
                updated.push({id, oldPrice: price, newPrice: item.price})
            }
        })

        updated.length && this.updatePricesQuery(updated);
        this.deleted.length && this.deleteQuery();
    };

    deleteQuery = async() => {
        try {
            await api.post('admin/deleteProducts', {ids: this.deleted});
            this.toggleEdit();
            this.initProducts = toJS(this.products);
            this.deleted = []
            alert('Успешно');
        } catch (err) {
            alert('Ошибка');
        }
    }

    updatePricesQuery = async(updated) => {
        try {
            await api.post('admin/updatePrices', {products: updated});
            this.toggleEdit();
            this.initProducts = toJS(this.products);
            alert('Успешно');
        } catch (err) {
            alert('Ошибка');
        }
    }

    getCategories = async () => {
        try {
            const categories = await api.get('categories/get');
            this.setCategories(categories);
        } catch (err) {
        }
    };

    getCatalog = async () => {
        this.setStatus(statusEnum.LOADING);
        const {category, fastfilter} = this;
        if (!this.category) {
            return
        }

        try {
            const body = {
                fastfilter,
                categoryId: category,
                limit: 10,
                offset: 0,
            };
            const products = await api.post('admin/getPricesProducts', body);
            this.setProducts(products);
            this.setInitProducts(products);
            this.setStatus(statusEnum.SUCCESS);
        } catch (err) {
            this.setStatus(statusEnum.ERROR);
        }
    };

    closeStore() {
        this.getCatalogDisposer();
    }
}

export {PriceStore};
