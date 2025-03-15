import React from 'react';
import s from './Sidebar.module.scss';
import {Link} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Drawer from './Drawer';

const menu = [
  {name: 'Товары', link: '/products', hasMenu: true},
  {name: 'Услуги', link: '/services'},
  {name: 'Посты', link: '/posts'},
  {name: 'Бренды', link: '/brands'},
  {name: 'Коллекции', link: '/collections'},
  {name: 'Заявки', link: '/calls'},
  {name: 'Наличие', link: '/stocks'},
  {name: 'Каталоги', link: '/catalogs'},
  {name: 'Обновления', link: '/updates'}
];

const Header = ({pathname}) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <React.Fragment>
      <List className={s.menuList}>
        <div className={s.logo}> <img src={'logo_shop.png'} /></div>
        {menu.map(({name, link, hasMenu}) => {

          if (hasMenu) {
            return (
              <Link key={link}>
                <ListItem
                  button={true}
                  key={name}
                  onClick={toggleDrawer(true)}
                  className={link === `/${pathname}` ? s.activeItem : null}
                >
                  {name}
                </ListItem>
              </Link>
            );
          }

          return (
            <Link to={link} key={link}>
              <ListItem
                button={true}
                key={name}
                className={link === `/${pathname}` ? s.activeItem : null}
              >
                {name}
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Drawer open={open} onClose={toggleDrawer(false)} />
    </React.Fragment>
  );

};

export default Header;
