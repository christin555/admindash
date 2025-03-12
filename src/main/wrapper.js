import React, {memo} from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import Body from './bodyWrapper';
import Loader from 'shared/Loader';

const Page = loadable(
  ({name}) => {
    switch (name) {
      case 'home': {
        return import('../components/home');
      }
      case 'products': {
        return import('../components/products');
      }
      case 'notFound': {
        return import('../shared/InformBlocks/PageNotFound');
      }
      case 'addproduct': {
        return import('../components/addProduct');
      }
      case 'posts': {
        return import('../components/posts');
      }
      case 'login': {
        return import('../components/Login');
      }
      case 'brands': {
        return import('../components/brands');
      }
      case 'collections': {
        return import('../components/collections');
      }
      case 'calls' : {
        return import('../components/calls');
      }
      case 'services' : {
        return import('../components/services');
      }
      case 'stocks' : {
        return import('../components/stocks');
      }
      case 'catalogs': {
        return import('../components/catalogs');
      }
      case 'updates': {
        return import('../components/updates');
      }
      default:
        return import('../shared/InformBlocks/PageNotFound');
    }
  }, {
    fallback: (<Loader />),
    cacheKey: ({name}) => name
  }
);

const Wrapper = ({name}) => (
  <Body pathname={name}>
    <Page name={name} />
  </Body>
);

Wrapper.propTypes = {
  name: PropTypes.string
};

export default memo(Wrapper);
