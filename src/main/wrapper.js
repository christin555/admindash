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
      case 'prices': {
            return import('../components/prices');
      }
      case 'notFound': {
        return import('../shared/InformBlocks/PageNotFound');
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
  <Body>
    <Page name={name} />
  </Body>
);

Wrapper.propTypes = {
  name: PropTypes.string
};

export default memo(Wrapper);
