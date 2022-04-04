import React from 'react';
import {inject, Provider} from 'mobx-react';
import {ProductsStore} from '../../stores/ProductsStore';
import PriceView from './PriceView';

@inject('RouterStore')
class FilterViewHOC extends React.Component {
    constructor(props) {
        super(props);

        const {RouterStore} = this.props;

        this.ProductsStore = new ProductsStore(RouterStore);

    }

    componentWillUnmount() {
        this.ProductsStore.closeStore()
    }

    render() {
        return (
            <Provider ProductsStore={this.ProductsStore}>
                <PriceView/>
            </Provider>
        );
    }
}

export default FilterViewHOC;
