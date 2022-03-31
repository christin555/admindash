import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {AppBar} from "@material-ui/core";
import Modal from "./Modal";
import {toJS} from "mobx";
import ModalDelete from "./ModalDelete";

@inject(({PriceStore}) => {
    return {
        selected: toJS(PriceStore.selected),
        showModal: PriceStore.showModal,
        isEdit: PriceStore.isEdit,
        toggleModalDeleteShow: PriceStore.toggleModalDeleteShow
    };
})
class PriceView extends React.Component {
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
                    selected?.length && isEdit && <AppBar className={s.bar} position="fixed">
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
