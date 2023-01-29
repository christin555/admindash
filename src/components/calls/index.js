import React from 'react';
import {inject, Provider} from 'mobx-react';
import CallsStore from '../../stores/CallsStore';
import View from './View';

@inject('RouterStore')
class Calls extends React.Component {
  constructor(props) {
    super(props);

    const {RouterStore} = this.props;

    this.CallsStore = new CallsStore(RouterStore);

  }

  componentWillUnmount() {
    this.CallsStore.closeStore();
  }

  render() {
    return (
      <Provider ListStore={this.CallsStore} CallsStore={this.CallsStore}>
        <View />
      </Provider>
    );
  }
}

export default Calls;
