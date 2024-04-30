import React from 'react';
import {inject, Provider} from 'mobx-react';
import DrawerView from './DrawerView';

@inject('ListStore')
class FilterViewHOC extends React.Component {
  constructor(props) {
    super(props);

    const {ListStore, DrawerCardStore} = this.props;

    this.DrawerCardStore = new DrawerCardStore(ListStore);
  }

  render() {
    return (
      <Provider DrawerCardStore={this.DrawerCardStore}>
        <DrawerView />
      </Provider>
    );
  }
}

export default FilterViewHOC;
