import {observable, action, computed, reaction, toJS} from 'mobx';
import ProductStore from './ProductStore';
import api from '../api';
import {alert} from './Notifications';

class DrawerStore extends ProductStore {
    @observable mode;

    constructor(ProductsStore) {
      super(ProductsStore?.RouterStore);

      this.ProductsStore = ProductsStore;

      reaction(
        () => this.ProductsStore.actionsData,
        this.setActions
      );
    }

    get selected() {
      return this.ProductsStore.selected;
    }

    get preparedObject() {
      return Object.entries(this.card).reduce((res, [key, val]) => {
        res[key] = val?.value || val;

        return res;
      }, {});
    }

    @action setActions = () => {
      this.mode = this.ProductsStore.actionsData.mode;
      const {category} = this.ProductsStore;

      if (this.mode === 'show' || this.mode === 'edit') {
        this.oldCard = toJS(this.ProductsStore.actionsData.values);
        this.card = toJS(this.ProductsStore.actionsData.values);
      }

      if (this.mode === 'add') {
        this.card.categoryId = category;
      }

      if (this.mode === 'copy') {
        this.card = toJS(this.ProductsStore.actionsData.values);
        delete this.card.id;
        delete this.card.name;
        delete this.card.alias;
        delete this.card.imgs;
        delete this.card.video;
      }
    }

    @action reset = () => {
      this.card = {};
      this.oldCard = {};
      this.mode = null;
      this.ProductsStore.actionsData = {};
      this.ProductsStore.setDrawerShow(false);
    }

    @action apply = () => {
      if (this.mode === 'edit') {
        this.edit({
          ids: [this.card.id],
          product: this.getEditedFields(this.formatBody(this.preparedObject))
        });
      }

      if (this.mode === 'massedit') {
        this.edit({
          ids: this.selected,
          product: this.formatBody(this.preparedObject)
        });
      }

      if (this.mode === 'copy' || this.mode === 'add') {
        this.create();
      }

      this.reset();
    }

    @action setMainPhoto = (src) => {
      this.setValue('imgs', toJS(this.card.imgs).map((item) => {
        if (src === item.src) {
          item.isMain = true;
        } else {
          item.isMain = false;
        }

        return item;
      }));
    }

    @action deletePhoto = (src) => {
      this.setValue('imgs', toJS(this.card.imgs).filter((item) => src !== item.src));
    }

    @action deleteVideo = (src) => {
      this.setValue('video', toJS(this.card.video).filter((item) => src !== item.src));
    }

    @computed get categoryParams() {
      return this.ProductsStore.categories.find(({id}) => id === this.card.categoryId) || {};
    }

    getLabelCollection = (val) => Object.values(this.fields)
      .flat()
      .find(({name}) => name === 'collectionId')?.values
      .find(({value}) => value === val)?.label

    get preparedNewObject() {
      const {card} = this;

      const res = Object.entries(card).reduce((res, [key, val]) => {
        res[key] = val?.value || val;

        return res;
      }, {});

      res._collection = this.getLabelCollection(card.collectionId);
      res._category = this.categoryParams.name;

      return res;
    }

    formatBody = (product) => {
      if (product.color) {
        product.color = product.color?.toLowerCase();
      }

      return product;
    }

    getEditedFields = (product) => {
      const updated = {};

      Object.keys(this.oldCard).forEach((key) => {
        if (JSON.stringify(product[key]) !== JSON.stringify(this.oldCard[key])) {
          updated[key] = product[key];
        }
      });

      return updated;
    }

    create = async() => {
      const {preparedNewObject} = this;

      try {
        await api.post('addObject', {product: this.formatBody(preparedNewObject)});
        this.ProductsStore.afterRequestSuccess();
      } catch(err) {
        alert({type: 'error', title: `Ошибка создания: ${err}`});
      }
    };

    edit = async({ids, product}) => {
      const body = {
        ids,
        data: product
      };

      try {
        await api.post('editProducts', body);
        this.ProductsStore.afterRequestSuccess();
      } catch(err) {
        alert({type: 'error', title: 'Ошибка'});
      }
    }

    loadFiled = (files, field) => {
      files.map(async(file) => {
        const data = new FormData();

        data.append('file', file);
        data.append('name', this.card.alias);

        try {
          const _file = await api.post('upload', data);

          if (!this.card[field]) {
            this.card[field] = [{src: _file}];
          } else {
            this.card[field].push({src: _file});
          }

        } catch(e) {
          console.log(e);
        }
      });
    }
}

export default DrawerStore;
