import React from 'react';
import {inject, Provider} from 'mobx-react';
import {CollectionsStore} from '../../stores/CollectionsStore';
import View from './View';

@inject('RouterStore')
class Collections extends React.Component {
  constructor(props) {
    super(props);

    const {RouterStore} = this.props;

    this.CollectionsStore = new CollectionsStore(RouterStore);
  }

  componentWillUnmount() {
    this.CollectionsStore.closeStore();
  }

  render() {
    return (
      <Provider ListStore={this.CollectionsStore} CollectionsStore={this.CollectionsStore}>
        <View />
      </Provider>
    );
  }
}

export default Collections;
