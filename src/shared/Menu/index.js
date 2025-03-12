import React from 'react';
import s from './Sidebar.module.scss';
import {Link} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


const menu = [
  {name: 'Товары', link: '/products'},
  {name: 'Услуги', link: '/services'},
  {name: 'Посты', link: '/posts'},
  {name: 'Бренды', link: '/brands'},
  {name: 'Коллекции', link: '/collections'},
  {name: 'Заявки', link: '/calls'},
  {name: 'Наличие', link: '/stocks'},
  {name: 'Каталоги', link: '/catalogs'},
  {name: 'Обновления', link: '/updates'}
];

const Header = ({pathname}) => (
  <List className={s.menuList}>
    <div className={s.logo}> <img src={'logo_shop.png'} /></div>
    {menu.map(({name, link}) => (
      <Link to={link} key={link}>
        <ListItem button={true} key={name} className={link === `/${pathname}` ? s.activeItem: null}>
          {name}
        </ListItem>
      </Link>
    ))}
  </List>
);

export default Header;
