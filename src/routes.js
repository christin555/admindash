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
const wrap = (name) => (props) => <StoreWrapper {...props} name={name} />;

//debugger
// eslint-disable-next-line react/display-name,react/no-multi-comp
export default () => (
  <DefaultStyle>
    <Provider RouterStore={RouterStore}>
      <BrowserRouter>
        <ReactNotifications />
        <Switch>
          <Route
            exact={true}
            path='/'
            render={wrap('products')}
          />
          <Route
            exact={true}
            path='/posts'
            render={wrap('posts')}
          />
          <Route
            exact={true}
            path='/collections'
            render={wrap('collections')}
          />
          <Route
            exact={true}
            path='/brands'
            render={wrap('brands')}
          />
          <Route
            exact={true}
            path='/login'
            render={wrap('login')}
          />
          <Route
            exact={true}
            path='/products/:category?'
            render={wrap('products')}
          />
          <Route
            exact={true}
            path='/stocks/:tab?'
            render={wrap('stocks')}
          />
          <Route
            exact={true}
            path='/addproduct'
            render={wrap('addproduct')}
          />
          <Route
            exact={true}
            path='/calls'
            render={wrap('calls')}
          />
          <Route
            exact={true}
            path='/services'
            render={wrap('services')}
          />
          <Route
            exact={true}
            path='/catalogs/:tab?'
            render={wrap('catalogs')}
          />
          <Route
            exact={true}
            path='/updates'
            render={wrap('updates')}
          />
          <Route
            render={wrap('notFound')}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  </DefaultStyle>
);

