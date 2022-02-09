import React from 'react';
import Footer from './Footer';
import Table from "./Table";
import Header from "./Header";

class PriceView extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                <Table/>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default PriceView;
