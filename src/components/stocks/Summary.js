import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import metersCount from './metersCount';

import priceFormat from './priceFormat';

@inject(({ListStore}) => {
  return {
    list: ListStore.list || []
  };
})
class Summary extends React.Component {
  render() {
    const {list} = this.props;
    const summary = {
      all: {
        price: 0,
        amount: 0,
        meters: 0
      },
      reserved: {
        price: 0,
        amount: 0,
        meters: 0
      },
      forSale: {
        price: 0,
        amount: 0,
        meters: 0
      }
    };

    list.forEach(({data}) => {

      if (!data) {
        return;
      }

      const {forSale, all, reserved} = data;

      summary.forSale.amount += forSale.amount;
      summary.forSale.price += forSale.price;
      summary.forSale.meters += Number(forSale.meters);

      summary.reserved.amount += Number(reserved.amount);
      summary.reserved.price += reserved.price;
      summary.reserved.meters += Number(reserved.meters);

      summary.all.amount += all.amount;
      summary.all.price += all.price;
      summary.all.meters += Number(all.meters);

    });

    return (
      <div className={s.summary}>
        <div className={s.details}>
          <div>  <span className={s.summaryTitle}>Для продажи: </span> {metersCount(summary.forSale)}  </div>
          <div>    {priceFormat(summary.forSale.price)}      </div>
        </div>

        <div className={s.details}>
          <div>
            <span className={s.summaryTitle}> В резерве:  </span>{metersCount(summary.reserved)}
          </div>
          <div>   {priceFormat(summary.reserved.price)}      </div>

        </div>
        <div className={s.details}>
          <div>  <span className={s.summaryTitle}> Всего: </span>
            {metersCount(summary.all)}
          </div>
          <div>  {priceFormat(summary.all.price)}   </div>
        </div>

      </div>
    );
  }
}

export default Summary;
