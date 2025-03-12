import React from 'react';
import Table from './Table';
import Toolbar from '../listComponetns/Toolbar';

class PriceView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Toolbar />
        <Table />
      </React.Fragment>
    );
  }
}

export default PriceView;
