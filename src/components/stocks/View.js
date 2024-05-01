import React from 'react';
import Footer from '../listComponetns/Footer';
import Table from './Table';
import Header from './Header';
import Toolbar from './Toolbar';
import Drawer from '../listComponetns/Drawer';
import DrawerStore from '../../stores/stocks/DrawerStoreStock';
import DrawerCardStoreStock from '../../stores/stocks/DrawerCardStoreStock';
import DrawerCard from './Drawer';

const View = () => (
  <React.Fragment>
    <Header />
    <Toolbar />
    <Table />
    <Footer withMassEdit={false} />
    <Drawer DrawerStore={DrawerStore} />
    <DrawerCard DrawerCardStore={DrawerCardStoreStock} />
  </React.Fragment>
);

export default View;
