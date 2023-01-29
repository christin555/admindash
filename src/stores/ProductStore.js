import {observable, action, autorun, set, makeObservable, computed} from 'mobx';
import {status as statusEnum} from '../enums';
import api from 'api';
import {groupArray2Object} from '../utils';

class ProductStore {

    @observable categories;
    @observable category;
    @observable status = statusEnum.LOADING;
    @observable card = {};
    @observable fields = {};

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
          values: this.categories
        }
      ];
    }

    @action setValue = (name, value) => {
      set(this.card, {[name]: value});
    };

    @action setFields = (fields) => {
      this.fields = fields;
    };

    @action setCategory = (category) => {
      this.category = category;
      this.card.categoryId = category;
    };

    @action setCategories = (categories) => {
      this.categories = categories;
    };

    getCategories = async() => {
      try {
        const categories = await api.get('categories/get');

        this.setCategories(categories.map(({id, name}) => {
          return {value: id, label: name};
        }));
      } catch(err) {
        console.log(err);
      }
    };

    getFields = async() => {
      const {category} = this;

      try {
        const fields = await api.post('getFields', {category: category?.value || category});
        const grouped = groupArray2Object(fields, 'group');

        Object.keys(grouped).forEach((key) => {
          grouped[key] = grouped[key].sort((a, b) => {
            if (!!a.isRequired === !!b.isRequired) {
              const textA = a.title?.toUpperCase();
              const textB = b.title?.toUpperCase();

              return textA < textB ? -1 : textA > textB ? 1 : 0;
            }

            return !!a.isRequired < !!b.isRequired ? 1 : !!a.isRequired > !!b.isRequired ? -1 : 0;

          });
        });

        this.setFields(grouped);
      } catch(err) {
        console.log(err);
      }
    };

    closeStore() {
      this.getFieldsDisposer();
    }
}

export default ProductStore;
