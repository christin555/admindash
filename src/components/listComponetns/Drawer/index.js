import React from 'react';
import {inject, Provider} from 'mobx-react';
import DrawerView from "./DrawerView";

@inject('ListStore')
class FilterViewHOC extends React.Component {
    constructor(props) {
        super(props);

        const {ListStore, DrawerStore} = this.props;

        this.DrawerStore = new DrawerStore(ListStore);
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
