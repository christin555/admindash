import React from 'react';
import {inject, Provider} from 'mobx-react';
import ProductStore from '../../stores/ProductStore';
import ProductView from './ProductView';

@inject('RouterStore')
class FilterViewHOC extends React.Component {
    constructor(props) {
        super(props);

        const {RouterStore} = this.props;

        this.ProductStore = new ProductStore(RouterStore);
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
