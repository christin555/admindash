import React from 'react';
import {inject, Provider} from 'mobx-react';
import {ProductsStore} from '../../stores/ProductsStore';
import PriceView from './PriceView';
import FilterStore from '../../stores/ProductsFilter';

@inject('RouterStore')
class FilterView extends React.Component {
  constructor(props) {
    super(props);

    const {RouterStore} = this.props;

    this.ProductsStore = new ProductsStore(RouterStore);
    this.FilterStore = new FilterStore(RouterStore, this.ProductsStore);
  }

  componentWillUnmount() {
    this.ProductsStore.closeStore();
    this.FilterStore.closeStore();
  }

  render() {
    return (
      <Provider
        FilterStore={this.FilterStore}
        ListStore={this.ProductsStore}
        ProductsStore={this.ProductsStore}
      >
        <PriceView />
      </Provider>
    );
  }
}

export default FilterView;
