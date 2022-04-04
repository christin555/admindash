import React from 'react';
import {inject, Provider} from 'mobx-react';
import ProductView from './ProductView';
import AddStore from "../../stores/AddStore";

@inject('RouterStore')
class FilterViewHOC extends React.Component {
    constructor(props) {
        super(props);

        const {RouterStore} = this.props;

        this.ProductStore = new AddStore(RouterStore);
    }

    componentWillUnmount() {
        this.ProductStore.closeStore()
    }

    render() {
        return (
            <Provider ProductStore={this.ProductStore}>
                <ProductView/>
            </Provider>
        );
    }
}

export default FilterViewHOC;
