import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {StoreWrapper} from './main/routeWrapper';
import {Provider} from 'mobx-react';
import RouterStore from './stores/Router';
import DefaultStyle from './themes/DefaultStyle';

require('dayjs/locale/ru');
import {ReactNotifications} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

// eslint-disable-next-line react/display-name
const wrap = (name) => (props) => <StoreWrapper {...props} name={name}/>;
//debugger
// eslint-disable-next-line react/display-name,react/no-multi-comp
export default () => (
    <DefaultStyle>
        <Provider RouterStore={RouterStore}>
            <BrowserRouter>
                <ReactNotifications/>
                <Switch>
                    <Route
                        exact={true}
                        path='/'
                        render={wrap('products')}
                    />

                    <Route
                        exact={true}
                        path='/login'
                        render={wrap('login')}
                    />
                    <Route
                        exact={true}
                        path='/products'
                        render={wrap('products')}
                    />
                    <Route
                        exact={true}
                        path='/addproduct'
                        render={wrap('addproduct')}
                    />
                    <Route
                        render={wrap('notFound')}
                    />
                </Switch>
            </BrowserRouter>
        </Provider>
    </DefaultStyle>
);

