import {observable, get, action, makeObservable, computed} from 'mobx';
import jwt_decode from 'jwt-decode';

class RouterStore {
    @observable location = {};
    @observable match = {};
    @observable history = {};
    isAuthenticated = false;

    constructor() {
      makeObservable(this);

      this.isAuthenticated = this.checkIsAuthenticated();
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

    checkIsAuthenticated = () => {
      const token = localStorage.getItem('token');

      try {
        const {exp} = jwt_decode(localStorage.token);

        return !exp < new Date() / 1000;
      } catch(err) {
        return false;
      }
    }
}

// Global store
export default new RouterStore();
