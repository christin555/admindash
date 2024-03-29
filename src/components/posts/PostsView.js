import React from 'react';
import Footer from './Footer';
import Table from './Table';
import Toolbar from './Toolbar';
import Drawer from '../listComponetns/Drawer';
import DrawerStore from '../../stores/DrawerStorePost';

class PostsView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Toolbar />
        <Table />
        <Footer />
        <Drawer DrawerStore={DrawerStore} />
      </React.Fragment>
    );
  }
}

export default PostsView;
