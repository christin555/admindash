import React from 'react';
import Footer from './Footer';
import Table from './Table';
import Toolbar from './Toolbar';
import Drawer from '../listComponetns/Drawer';
import DrawerStore from '../../stores/catalogs/Drawer';
import Header from './Header';

class View extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Toolbar />
        <Table />
        <Footer />
        <Drawer DrawerStore={DrawerStore} />
      </React.Fragment>
    );
  }
}

export default View;
