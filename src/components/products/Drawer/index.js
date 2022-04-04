import React from 'react';
import {inject, Provider} from 'mobx-react';
import DrawerStore from '../../../stores/DrawerStore';
import DrawerView from "./DrawerView";

@inject('ProductsStore')
class FilterViewHOC extends React.Component {
    constructor(props) {
        super(props);

        const {ProductsStore} = this.props;

        this.DrawerStore = new DrawerStore(ProductsStore);

    }


    render() {
        return (
            <Provider DrawerStore={this.DrawerStore}>
                <DrawerView/>
            </Provider>
        );
    }
}

export default FilterViewHOC;
