import React, {Component} from 'react';
import s from './Sidebar.module.scss';
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import styled from "@emotion/styled";
import {createStyles, withStyles} from "@material-ui/core/styles";

const StyledDrawer = withStyles(({palette}) =>
    createStyles({
        root: {
            '& [class*="MuiDrawer-paper"]': {
                background: 'rgba(33, 33, 33, 0.62)',
            }
        }
    }))(Drawer);

class Header extends Component {
    menu = [
        {name: 'Цены', important: true, link: '/prices'},
    ]

    render() {
        return (
            <Box
                component="nav"
                sx={{width: {sm: 200}, flexShrink: {sm: 0}}}
                aria-label="mailbox folders"
            >
                <StyledDrawer
                    className={s.container}
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: 200},
                    }}
                    open
                >
                    <div >
                        <Toolbar/>
                        <Divider   className={s.divider}/>
                        <List className={s.list}>
                            {this.menu.map(({name, link}) => (
                                <Link to={link}>
                                    <ListItem button key={name}>
                                        <ListItemText primary={name}/>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </div>
                </StyledDrawer>
            </Box>
        );
    }
}

export default Header;
