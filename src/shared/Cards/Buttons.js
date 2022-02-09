import React from 'react';
import s from './Cards.module.scss';
import CardActions from '@material-ui/core/CardActions';
import {inject} from 'mobx-react';
import Callme from '../Callme';
import AddShoppingCartIcon from '@material-ui/icons/ShoppingCart';

@inject(({RouterStore}) => {
  return {RouterStore};
})
class Buttons extends React.Component {
  render() {
    const {
      imgForHover,
      isDoor,
      img,
      name,
      id,
      withPhone
    } = this.props;

    return withPhone && (
      <div
        className={s.actions}
      >
        <Callme
          isShowButText={false}
          product={{imgForHover, img, name, id, isDoor}}
          buttonProps={{
            className: s.call,
            startIcon: <AddShoppingCartIcon />,
            color: 'black',
            size: 'small',
            variant: 'text'
          }}
        />
      </div>
    ) || null;
  }
}

export default Buttons;
