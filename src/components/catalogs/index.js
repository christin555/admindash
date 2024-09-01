import React from 'react';
import {inject, Provider} from 'mobx-react';
import Store from '../../stores/catalogs/ListStore';
import View from './View';

@inject('RouterStore')
class FilterViewHOC extends React.Component {
  constructor(props) {
    super(props);

    const {RouterStore} = this.props;

    this.PostsStore = new Store(RouterStore);

  }

  componentWillUnmount() {
    this.PostsStore.closeStore();
  }

  render() {
    return (
      <Provider ListStore={this.PostsStore}>
        <View />
      </Provider>
    );
  }
}

export default FilterViewHOC;
