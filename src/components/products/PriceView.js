import React from 'react';
import Footer from './Footer';
import Table from './Table';
import Header from './Header';
import Drawer from '../listComponetns/Drawer';
import Toolbar from './Toolbar';
import DrawerStore from '../../stores/DrawerStore';

class PriceView extends React.Component {
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

export default PriceView;
