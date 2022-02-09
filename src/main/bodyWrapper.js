import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './main.module.scss';
import cn from 'classnames';

class Body extends Component {
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const {children} = this.props;

    return (
        <React.Fragment>
            <div className={s.background}/>
      <div className={s.wrapper}>

        {/*<Sidebar />*/}
        <main className={cn(s.content)}>
            <div>
                {children}
            </div>
        </main>
      </div>
        </React.Fragment>
    );
  }
}

Body.propTypes = {
  children: PropTypes.any,
  pathname: PropTypes.string
};

export default Body;
