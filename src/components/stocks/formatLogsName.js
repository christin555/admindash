import React from 'react';
import s from './style.module.scss';

const names = {
  'removeStock': 'Списание со склада',
  'addStock': 'Пополнение склада',
  'addArrival': 'Добавление прихода',
  'addSale': 'Продажа',
  'deleteSale': 'Удаление продажи',
  'deleteArrival': 'Удаление прихода',
  'editArrival': 'Изменение прихода',
  'editSale': 'Изменение продажи'
};

const classes = {
  'addStock': s.addStock,
  'removeStock': s.removeStock
};

const formatLogsName = (action) => (
  <div className={classes[action]}>{names[action]}</div>
);

export default formatLogsName;
