import React, {Component, useState} from 'react';
import s from './Sidebar.module.scss';
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import {createStyles, withStyles} from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Button from "../Button";

const StyledDrawer = withStyles(({palette}) =>
    createStyles({
        root: {
            '& [class*="MuiDrawer-paper"]': {
                background: 'rgba(33, 33, 33, 0.62)',
            }
        }
    }))(Drawer);

const menu = [
    {name: 'Цены', link: '/prices'},
    {name: 'Добавить товар', link: '/addproduct'},
]

const Header = () => {

    const [isOpen, setOpen] = useState(false);

    return (

        <>
            <Button onClick={() => setOpen(!isOpen)} className={s.button}>
                <MenuIcon/>
            </Button>
            <Drawer
                onBlur={() => setOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: 200},
                }}
                open={isOpen}>
                <div>
                    <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                        Меню
                        <Button onClick={() => setOpen(false)}>
                            <CloseIcon/>
                        </Button>
                    </Toolbar>
                    <Divider className={s.divider}/>
                    <List className={s.list}>
                        {menu.map(({name, link}) => (
                            <Link to={link}>
                                <ListItem button key={name}>
                                    <ListItemText primary={name}/>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </div>
            </Drawer>
        </>
    );
}

export default Header;
