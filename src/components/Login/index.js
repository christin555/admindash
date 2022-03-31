import React from 'react';
import {Provider} from 'mobx-react';
import AuthStore from '../../stores/AuthStore';
import Lv from './Lv';

class FilterViewHOC extends React.Component {
    constructor(props) {
        super(props);

        this.AuthStore = new AuthStore();
    }

    render() {
        return (
            <Provider AuthStore={this.AuthStore}>
                <Lv/>
            </Provider>
        );
    }
}

export default FilterViewHOC;
