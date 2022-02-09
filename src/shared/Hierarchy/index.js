import React from 'react';
import s from './Hierarchy.module.scss';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {inject} from 'mobx-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

@inject(({RouterStore: {history}}) => {
  return {history};
})
class Hierarchy extends React.Component {
  routeChange = (alias) => {
    const {history} = this.props;
    const pathname = `/catalog/${alias}`;

    history.push({pathname});
  }

  toCatalog = () => this.props.history.push({pathname: '/catalog'});

  render() {
    const {hierarchy, className} = this.props;

    return (
      <div className={classNames(s.level, className)}>
        {hierarchy?.length ? <span onClick={this.toCatalog}>Каталог</span> : null}
        {
          hierarchy.map(({name, alias}, index) => (
            <React.Fragment key={index}>
              <ArrowForwardIosIcon className={s.icon} />
              <span
                onClick={() => index !== hierarchy.length - 1 && alias && this.routeChange(alias)}
                className={index === hierarchy.length - 1 ? s.last : null}
              >
                {name}
              </span>
            </React.Fragment>
          ))
        }
      </div>
    );
  }
}

Hierarchy.propTypes = {
  hierarchy: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object
};

Hierarchy.defaultProps = {
  hierarchy: []
};

export default Hierarchy;
