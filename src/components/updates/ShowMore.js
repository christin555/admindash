import React, {Component} from 'react';
import Button from '../../shared/Button';
import s from './style.module.scss';

class ShowMore extends Component {
  state = {
    collapsed: true
  };

  render() {
    const {collapsed} = this.state;
    const {children, size} = this.props;

    console.log('size', size);

    const isActive = size > 300;

    if (!isActive) {
      return <div>{children} </div>;
    }

    return (
      <div className={s.container} style={{height: collapsed ? '170px' : 'unset'}}>
        {children}
        <div
          className={s.moreContainer}
          style={{
            position: collapsed ? 'absolute' : 'unset',
            background: collapsed ? 'linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,0) 62%, rgba(255,255,255,1) 85%, rgba(255,255,255,1) 100%)' : 'unset'}}
        >
          <Button onClick={() => {
            this.setState({collapsed: !collapsed});
          }}
          > {collapsed ? 'Раскрыть' : 'Скрыть'}
          </Button>
        </div>

      </div>
    );
  }
}

export default ShowMore;