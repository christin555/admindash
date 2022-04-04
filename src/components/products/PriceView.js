import React from 'react';
import Footer from './Footer';
import Table from "./Table";
import Header from "./Header";
import Drawer from "./Drawer";

class PriceView extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                <Table/>
                <Footer/>
                <Drawer/>
            </React.Fragment>
        );
    }
}

export default PriceView;
