import React from 'react';
import {inject, Provider} from 'mobx-react';
import {PostsStore} from '../../stores/PostsStore';
import PostsView from './PostsView';

@inject('RouterStore')
class FilterViewHOC extends React.Component {
  constructor(props) {
    super(props);

    const {RouterStore} = this.props;

    this.PostsStore = new PostsStore(RouterStore);

  }

  componentWillUnmount() {
    this.PostsStore.closeStore();
  }

  render() {
    return (
      <Provider ListStore={this.PostsStore} PostsStore={this.PostsStore}>
        <PostsView />
      </Provider>
    );
  }
}

export default FilterViewHOC;
