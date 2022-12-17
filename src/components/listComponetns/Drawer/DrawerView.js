import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import {Drawer} from "@material-ui/core";
import Footer from "./Footer";
import Header from "./Header";
import Content from "./Content";

@inject(({DrawerStore, ListStore}) => {
    return {
        isDrawerShow: ListStore.isDrawerShow,
        reset: DrawerStore.reset
    };
})
class DrawerStore extends React.Component {
    render() {
        const {
            isDrawerShow,
            reset
        } = this.props;

        return (
            <Drawer
                anchor={'right'}
                open={isDrawerShow}
                onClose={reset}
                className={s.drawer}
            >
                <div className={s.container}>
                    <Header/>
                    <Content/>
                    <Footer/>
                </div>

            </Drawer>
        );
    }
}

export default DrawerStore;
