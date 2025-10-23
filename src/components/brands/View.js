import React from 'react';
import Footer from '../listComponetns/Footer';
import Table from './Table';
import Toolbar from '../listComponetns/Toolbar';
import Drawer from '../listComponetns/Drawer';
import DrawerStore from '../../stores/DrawerStoreBrand';

class PriceView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Toolbar />
        <Footer />
        <Table />
        <Drawer DrawerStore={DrawerStore} withMassEdit={false} />
      </React.Fragment>
    );
  }
}

export default PriceView;
