import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {AppBar} from "@material-ui/core";
import Modal from "./Modal";
import {toJS} from "mobx";
import ModalDelete from "./ModalDelete";

@inject(({ProductsStore}) => {
    return {
        selected: toJS(ProductsStore.selected),
        showModal: ProductsStore.showModal,
        isEdit: ProductsStore.isEdit,
        openDrawerWithMode: ProductsStore.openDrawerWithMode,
        toggleModalDeleteShow: ProductsStore.toggleModalDeleteShow
    };
})
class PriceView extends React.Component {
    openDrawer = () => this.props.openDrawerWithMode('massedit', this.props.selected)

    render() {
        const {
            selected,
            showModal,
            isEdit,
            toggleModalDeleteShow
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
                                onClick={showModal}
                            > Изменить цену
                            </Button>
                        }
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
                <Modal/>
                <ModalDelete/>
            </React.Fragment>
        );
    }
}

export default PriceView;
