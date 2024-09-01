import React, {Component, useState} from 'react';
import s from './Sidebar.module.scss';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import {createStyles, withStyles} from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../Button';

const StyledDrawer = withStyles(({palette}) =>
  createStyles({
    root: {
      '& [class*="MuiDrawer-paper"]': {
        background: 'rgba(33, 33, 33, 0.62)'
      }
    }
  }))(Drawer);

const menu = [
  {name: 'Товары', link: '/products'},
  {name: 'Услуги', link: '/services'},
  {name: 'Посты', link: '/posts'},
  {name: 'Бренды', link: '/brands'},
  {name: 'Коллекции', link: '/collections'},
  {name: 'Заявки', link: '/calls'},
  {name: 'Наличие', link: '/stocks'},
  {name: 'Каталоги', link: '/catalogs'}
];

const Header = () => (
  <List className={s.menuList}>
    <div className={s.logo}> <img src={'logo_shop.png'} /></div>
    {menu.map(({name, link}) => (
      <Link to={link} key={link}>
        <ListItem button={true} key={name}>
          {name}
        </ListItem>
      </Link>
    ))}
  </List>
);

export default Header;
