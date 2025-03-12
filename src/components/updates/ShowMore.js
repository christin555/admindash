import React, {Component} from 'react';
import Button from '../../shared/Button';
import s from './style.module.scss';

class ShowMore extends Component {
  state = {
    collapsed: true
  };

  render() {
    const {collapsed} = this.state;
    const {text} = this.props;

    const isActive = text.length > 220;

    if (!isActive) {
      return <div className={s.container}> {text} </div>;
    }

    return (
      <div className={s.container}>
        {collapsed ? text.slice(0, 220) : text}{collapsed ? <span> ... </span> : null}
        <div>
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