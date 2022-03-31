import React, {Component} from 'react';
import {inject} from 'mobx-react';
import Wrapper from './wrapper';
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";

@inject('RouterStore')
class StoreWrapper extends Component {
    constructor(props) {
        super(props);

        this.updateStore();
    }

    componentDidUpdate() {
        this.updateStore();
    }

    updateStore = () => {
        const {
            RouterStore
        } = this.props;

        RouterStore.setRoute(
            this.props.location,
            this.props.match,
            this.props.history
        );
    };

    render() {
        const {name, RouterStore} = this.props;

        if (name !=='login' && !RouterStore.isAuthenticated) {
            return <Redirect to='/login'/>;
        }

        if (name ==='login' && RouterStore.isAuthenticated) {
            return <Redirect to='/'/>;
        }

        return (
            <Wrapper name={name}/>
        );
    }
}

StoreWrapper.propTypes = {
    RouterStore: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object,
    name: PropTypes.string
};

export {StoreWrapper};
