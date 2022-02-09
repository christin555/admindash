import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {StoreWrapper} from './main/routeWrapper';
import {Provider} from 'mobx-react';
import RouterStore from './stores/Router';
require('dayjs/locale/ru');

// eslint-disable-next-line react/display-name
const wrap = (name) => (props) => <StoreWrapper {...props} name={name}/>;
//debugger
// eslint-disable-next-line react/display-name,react/no-multi-comp
export default () => (
    <Provider RouterStore={RouterStore}>
            <BrowserRouter>
                <Switch>
                    <Route
                        exact={true}
                        path='/'
                        render={wrap('prices')}
                    />
                    <Route
                        exact={true}
                        path='/prices'
                        render={wrap('prices')}
                    />
                    <Route
                        render={wrap('notFound')}
                    />
                </Switch>
            </BrowserRouter>
    </Provider>
);

