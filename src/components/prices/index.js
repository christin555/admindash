import React from 'react';
import {inject, Provider} from 'mobx-react';
import {PriceStore} from '../../stores/PricesStore';
import PriceView from './PriceView';

@inject('RouterStore')
class FilterViewHOC extends React.Component {
    constructor(props) {
        super(props);

        const {RouterStore} = this.props;

        this.PriceStore = new PriceStore(RouterStore);

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <Provider PriceStore={this.PriceStore}>
                <PriceView/>
            </Provider>
        );
    }
}

export default FilterViewHOC;
