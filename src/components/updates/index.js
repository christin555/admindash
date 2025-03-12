import React from 'react';
import {inject, Provider} from 'mobx-react';
import {UpdatesStore} from '../../stores/UpdatesStore';
import View from './View';

@inject('RouterStore')
class List extends React.Component {
  constructor(props) {
    super(props);

    const {RouterStore} = this.props;

    this.ListStore = new UpdatesStore(RouterStore);
  }

  componentWillUnmount() {
    this.ListStore.closeStore();
  }

  render() {
    return (
      <Provider ListStore={this.ListStore}>
        <View />
      </Provider>
    );
  }
}

export default List;
