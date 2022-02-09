import {observable, get, action, makeObservable, computed} from 'mobx';

class RouterStore {
  @observable location = {};
  @observable match = {};
  @observable history = {};

  constructor() {
    makeObservable(this);
  }

  @computed get pathname() {
    return this.location.pathname;
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
}

// Global store
export default new RouterStore();
