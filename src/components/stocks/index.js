import React from 'react';
import {inject, Provider} from 'mobx-react';
import StocksStore from '../../stores/StocksStore';
import View from './View';

@inject('RouterStore')
class FilterViewHOC extends React.Component {
  constructor(props) {
    super(props);

    const {RouterStore} = this.props;

    this.StocksStore = new StocksStore(RouterStore);

  }

  componentWillUnmount() {
    this.StocksStore.closeStore();
  }

  render() {
    return (
      <Provider ListStore={this.StocksStore} StocksStore={this.StocksStore}>
        <View />
      </Provider>
    );
  }
}

export default FilterViewHOC;
