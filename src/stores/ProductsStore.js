import {observable, action, autorun, computed, makeObservable, reaction, toJS} from 'mobx';
import {status as statusEnum} from '../enums';
import api from 'api';
import {alert} from './Notifications';

class ProductsStore {

    @observable status = statusEnum.LOADING;
    @observable categories;
    @observable products = [];
    @observable columns = [];

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
    @observable edited = [];
    @observable actionsData = {};

    @observable ActiveFilterStore = {};
    @observable isModalDeleteShow = false;

    @observable isDrawerShow = false;

    body = {};

    constructor(RouterStore) {
        makeObservable(this);
        this.getCategories();
        this.getColumns();
        this.getCatalogDisposer = autorun(this.getCatalog);
    }

    @computed get updatedPrice() {
        const {initProducts, products} = this;
        const updated = [];

        initProducts.forEach(({id, price}) => {
            const item = products.find(({id: _id}) => id === _id);

            if (item && item.price !== price) {
                updated.push({id, oldPrice: price, newPrice: item.price})
            }
        })

        return updated;
    }

    @action openDrawerWithMode = (mode, values) => {
        this.actionsData = {mode, values};
        this.isDrawerShow = true;
    }

    @action setDrawerShow = status => this.isDrawerShow = status;

    @action setColumns = columns => this.columns = columns;

    @action toggleModalDeleteShow = () => this.isModalDeleteShow = !this.isModalDeleteShow;


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
        if (limit) {
            this.limit = limit;
        }
    };

    @action toggleEdit = () => {
        this.setSelected([]);
        this.updated = [];
        this.deleted = [];
        this.edited = [];
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
        const updated = this.initProducts
            .filter(({id}) => this.selected.includes(id))
            .map(({id, price}) => {
                    return {
                        id, oldPrice: price, newPrice: this.checkedPrice
                    }
                }
            )

        this.updatePricesQuery(updated);
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
        const {deleted, updatedPrice} = this;
        deleted.length && this.deleteQuery();

        updatedPrice.length && this.updatePricesQuery(updatedPrice);
        this.toggleEdit();
    };


    deleteQuery = async () => {
        try {
            await api.post('deleteProducts', {ids: this.deleted});
            this.afterRequestSuccess();
        } catch (err) {
            alert({type: 'error', title: 'Ошибка'});
        }
    }

    afterRequestSuccess = async () => {
        await this.getCatalog();
        this.initProducts = toJS(this.products);
        alert({type: 'success', title: 'Успешно обновлено'});
        this.setSelected([]);
    }

    updatePricesQuery = async (updated) => {
        try {
            await api.post('updatePrices', {products: updated});
            this.initProducts = toJS(this.products);

            this.closeModal();
            this.setPriceChecked('');
            this.afterRequestSuccess();
        } catch (err) {
            alert({type: 'error', title: 'Ошибка'});
        }
    }

    getColumns = async () => {
        try {
            const columns = await api.get('getColumns');
            this.setColumns(columns.map(({name, title}) => {
                if (name === 'name') {
                    return {}
                }
                return {

                    field: name,
                    headerName: title,
                    hide: true,
                    flex: 1,
                    minWidth: 250
                }
            }))
        } catch (err) {
        }
    };

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
                categoryId: category
            };
            const products = await api.post('getPricesProducts', body);
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

export {ProductsStore};
