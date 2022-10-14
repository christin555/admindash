import React from 'react';
import {inject, Provider} from 'mobx-react';
import s from './style.module.scss';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {AppBar} from "@material-ui/core";
import {toJS} from "mobx";
import ModalDelete from "../listComponetns/ModalDelete";
import PostsView from "./PostsView";

@inject(({PostsStore}) => {
    return {
        selected: toJS(PostsStore.selected),
        isEdit: PostsStore.isEdit,
        openDrawerWithMode: PostsStore.openDrawerWithMode,
        toggleModalDeleteShow: PostsStore.toggleModalDeleteShow,
        PostsStore
    };
})
class Footer extends React.Component {
    openDrawer = () => this.props.openDrawerWithMode('massedit', this.props.selected)

    render() {
        const {
            selected,
            isEdit,
            toggleModalDeleteShow,
            PostsStore
        } = this.props;

        return (
            <React.Fragment>
                {
                    selected?.length && isEdit && <AppBar className={s.bar} position="sticky">
                        <Button
                            variant={'contained'}
                            onClick={toggleModalDeleteShow}
                            color={'secondary'}
                        > Удалить товары
                        </Button>
                        {
                            <Button
                                variant={'contained'}
                                onClick={this.openDrawer}
                            > Массовое редактирование
                            </Button>
                        }

                        <Box> Выбрано {selected?.length} строки </Box>
                    </AppBar>
                    || null
                }
                <ModalDelete />
            </React.Fragment>
        );
    }
}

export default Footer;
