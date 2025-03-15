import {observable, get, action, makeObservable, computed} from 'mobx';
import jwt_decode from 'jwt-decode';
import api from '../../api';

class RouterStore {
    @observable location = {};
    @observable match = {};
    @observable history = {};

    @observable categoriesMenu = [];

    isAuthenticated = false;

    constructor() {
      makeObservable(this);

      this.isAuthenticated = this.checkIsAuthenticated();

      this.getCategoryHierarchy();
    }

    @computed get pathname() {
      return this.location.pathname;
    }

    getKey(key) {
      return get(get(this.match, 'params'), key) || null;
    }

    @computed get params() {
      return get(this.location, 'search') || null;
    }

    @action setRoute(location, match, history) {
      this.location = location;
      this.match = match;
      this.history = history;
    }

    @action getParam = (param) => {
      const urlAddress = new URLSearchParams(this.params || '');

      return urlAddress.get(param);
    };

    @action setCategoriesMenu = (categoriesMenu) => {
      this.categoriesMenu = categoriesMenu;
    };

    checkIsAuthenticated = () => {
      const token = localStorage.getItem('token');

      try {
        const {exp} = jwt_decode(localStorage.token);

        return !exp < new Date() / 1000;
      } catch(err) {
        return false;
      }
    }

  getCategoryHierarchy = async() => {
    try {
      const categoriesMenu = await api.get('getCategoryHierarchy');
      this.setCategoriesMenu(categoriesMenu);
    } catch(err) {
      console.log(err);
    }

  }
}

// Global store
export default new RouterStore();
