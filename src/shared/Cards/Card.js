import React from 'react';
import s from './Cards.module.scss';
import {Card} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import cn from 'classnames';
import {inject} from 'mobx-react';
import Buttons from './Buttons';
import {Link} from 'react-router-dom';

const plural = require('plural-ru');

@inject(({RouterStore}) => {
  return {RouterStore};
})
class CardView extends React.Component {

  get collectionLabel() {
    const {collection} = this.props;

    if (!collection) {
      return null;
    }

    return <span> {`| ${collection}`} </span>;
  }

  get colors() {
    const {finishingMaterial = []} = this.props;

    if (!finishingMaterial || !finishingMaterial.length) {
      return null;
    }

    const finishingMateriaLabel = plural(
      finishingMaterial.length,
      'оттенок',
      'оттенка',
      'оттенков'
    );

    return ` | ${finishingMaterial.length} ${finishingMateriaLabel}`;
  }

  render() {
    const {
      alias,
      isDoor,
      img,
      name,
      brand,
      id,
      price,
      straightLink
    } = this.props;
    const pathname = straightLink && alias || alias && `/catalog/${alias}` || `/product/${id}`;

    return (
      <Card className={s.root}>
        <CardActionArea
          className={s.area}
        >
          <CardMedia
            className={s.media}
          >
            <Link to={pathname}>
              <img
                className={cn(s.img, {[s.isDoor]: isDoor})}
                src={img}
              />
            </Link>

            <Buttons {...this.props} />
          </CardMedia>

          <Link to={pathname}>
            <CardContent
              className={s.content}
            >
              {
                brand && (
                  <span className={s.brand}>
                    {brand}
                    {this.collectionLabel}
                    {/* {this.colors}*/}
                  </span>
                )
              }
              <span className={s.name}>
                {name}
              </span>
              {
                price && (
                  <span className={s.price}> {price.price} ₽
                    <span className={s.unit}>
                  за 1 м2
                    </span>
                  </span>
                ) || null
              }
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    );
  }
}

export default CardView;
