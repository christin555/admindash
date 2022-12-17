import React from 'react';
import {inject, Provider} from 'mobx-react';
import {BrandsStore} from '../../stores/BrandsStore';
import View from './View';

@inject('RouterStore')
class Brands extends React.Component {
  constructor(props) {
    super(props);

    const {RouterStore} = this.props;

    this.BrandsStore = new BrandsStore(RouterStore);

  }

  componentWillUnmount() {
    this.BrandsStore.closeStore();
  }

  render() {
    return (
      <Provider ListStore={this.BrandsStore} BrandsStore={this.BrandsStore}>
        <View />
      </Provider>
    );
  }
}

export default Brands;
