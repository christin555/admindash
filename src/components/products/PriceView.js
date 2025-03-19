import React from 'react';
import Footer from './Footer';
import Table from './Table';
import Header from './Header';
import CreateDrawer from '../listComponetns/Drawer';
import Toolbar from './Toolbar';
import DrawerStore from '../../stores/DrawerStore';
import FilterDrawer from './Filter';

const PriceView = () => (
  <React.Fragment>
    <Header />
    <Toolbar />
    <Table />
    <Footer />
    <CreateDrawer DrawerStore={DrawerStore} />
    <FilterDrawer />
  </React.Fragment>
);

export default PriceView;
