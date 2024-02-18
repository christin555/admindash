import {observable, action, autorun, computed, makeObservable, reaction, toJS} from 'mobx';
import {status as statusEnum} from '../enums';
import api from 'api';
import {alert} from './Notifications';
import {ListItemsStore} from './ListItemsStore';

class ProductsStore extends ListItemsStore {
    RouterStore;

    @observable categories;
    @observable columns = [];

    ///@observable category = 1;
    @observable checkedPrice;

    @observable hierarchy;
    @observable isLastLevel;
    @observable count = 0;
    @observable isHydrating;

    @observable filter = {
      'showOnSite': true
    }

    body = {};

    constructor(RouterStore) {
      super(RouterStore);

      makeObservable(this);
      this.getCategories();
      this.getColumns();
      this.getCatalogDisposer = autorun(this.getList);

      this.setInitialColumns();
    }

    @computed get category() {
      return Number(this.RouterStore.getKey('category')) || 1;
    }

    @computed get updatedPrice() {
      const {initList, list} = this;
      const updated = [];

      initList.forEach(({id, price}) => {
        const item = list.find(({id: _id}) => id === _id);

        if (item && item.price !== price) {
          updated.push({id, oldPrice: price, newPrice: item.price});
        }
      });

      return updated;
    }

    setInitialColumns = () => {
      this.showColumns = {
        img: true,
        name: true,
        actions: true,
        collection: true,
        brand: true,
        price: true,
        salePrice: true,
        priceUpdatedAt: true
      };
    };

    @action setFilter = (key, val) => {
      this.filter = {...this.filter, [key]: val};
    }

    @action setCategory = (_, category) => {
      //this.category = category;
      this.RouterStore.history.push(`/products/${category}`);
    };

    @action setPrice = (_id, price) => {
      const pr = this.list.find(({id}) => id === _id);

      pr.price = price;
    };

    @action setPriceChecked = (price) => {
      this.checkedPrice = price;
    };

    @action setColumns = (_columns) => {
      this.columns = _columns;
    };

    @action updatePrices = () => {
      const updated = this.initList
        .filter(({id}) => this.selected.includes(id))
        .map(({id, price}) => {
          return {
            id, oldPrice: price, newPrice: this.checkedPrice
          };
        });

      this.updatePricesQuery(updated);
    }

    @action setCategories = (categories) => {
      this.categories = categories;
    };

    setShowOnSite = async(state) => {
      try {
        await api.post('editProducts', {
          ids: this.selected,
          data: {
            showOnSite: state
          }
        });
        this.afterRequestSuccess();
      } catch(err) {
        alert({type: 'error', title: 'Ошибка'});
      }
    }

    afterSave = () => this.updatedPrice.length && this.updatePricesQuery(this.updatedPrice);
    deleteQuery = async() => {
      try {
        await api.post('deleteProducts', {ids: this.deleted});
        this.afterRequestSuccess();
      } catch(err) {
        alert({type: 'error', title: 'Ошибка'});
      }
    }

    updatePricesQuery = async(updated) => {
      try {
        await api.post('updatePrices', {products: updated});
        this.initList = toJS(this.list);

        this.closeModal();
        this.setPriceChecked('');
        this.afterRequestSuccess();
      } catch(err) {
        alert({type: 'error', title: 'Ошибка'});
      }
    }

    getColumns = async() => {
      try {
        const columns = await api.get('getColumns');
        const _columns = [];

        columns.forEach(({name, title}) => {
          if (!Object.keys(this.showColumns).includes(name) && !_columns.some(({field}) => field === name)) {
            _columns.push({
              field: name,
              headerName: title,
              hide: true,
              minWidth: 250
            });
          }
        });
        this.setColumns(_columns);
      } catch(err) {
      }
    };

    getCategories = async() => {
      try {
        const categories = await api.get('categories/get');

        this.setCategories(categories);
      } catch(err) {
        console.log(err);
      }
    };

    getList = async() => {
      this.setStatus(statusEnum.LOADING);
      const {category, fastfilter, filter} = this;

      if (!this.category) {
        return;
      }

      try {
        const body = {
          fastfilter,
          categoryId: category,
          ...filter
        };
        const products = await api.post('getPricesProducts', body);

        this.setList(products);
        this.setInitList(products);
        this.setStatus(statusEnum.SUCCESS);
      } catch(err) {
        this.setStatus(statusEnum.ERROR);
      }
    };

    closeStore() {
      this.getCatalogDisposer();
    }
}

export {ProductsStore};
