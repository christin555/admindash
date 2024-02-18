import React from 'react';
import {inject, Provider} from 'mobx-react';
import {ServicesStore} from '../../stores/ServicesStore';
import View from './View';

@inject('RouterStore')
class Brands extends React.Component {
  constructor(props) {
    super(props);

    const {RouterStore} = this.props;

    this.ServicesStore = new ServicesStore(RouterStore);

  }

  componentWillUnmount() {
    this.ServicesStore.closeStore();
  }

  render() {
    return (
      <Provider ListStore={this.ServicesStore} ServicesStore={this.ServicesStore}>
        <View />
      </Provider>
    );
  }
}

export default Brands;
