import React, {Component} from 'react';
import {inject} from 'mobx-react';
import Wrapper from './wrapper';
import PropTypes from 'prop-types';

@inject('RouterStore')
class StoreWrapper extends Component {
  constructor(props) {
    super(props);

    this.updateStore();
  }

  componentDidUpdate() {
    this.updateStore();
  }

  updateStore = () => {
    const {
      RouterStore
    } = this.props;

    RouterStore.setRoute(
      this.props.location,
      this.props.match,
      this.props.history
    );
  };

  render() {
    const {name} = this.props;

    return (
      <Wrapper name={name} />
    );
  }
}

StoreWrapper.propTypes = {
  RouterStore: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  name: PropTypes.string
};

export {StoreWrapper};
