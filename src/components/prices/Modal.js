import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";

import {Modal, Typography} from "@material-ui/core";

@inject(({PriceStore}) => {
    return {
        isModalShow: PriceStore.isModalShow,
        closeModal: PriceStore.closeModal,
        setPriceChecked: PriceStore.setPriceChecked,
        checkedPrice: PriceStore.checkedPrice,
        updatePrices: PriceStore.updatePrices,
    };
})
class PriceView extends React.Component {
    render() {
        const {
            isModalShow,
            closeModal,
            setPriceChecked,
            checkedPrice,
            updatePrices
        } = this.props;

        return (
                <Modal
                    open={isModalShow}
                    onClose={closeModal}
                >
                    <Box className={s.modal}>
                        <Box>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Новая цена
                            </Typography>
                            <TextField
                                onChange={({target: {value}}) => setPriceChecked(value)}
                                value={checkedPrice || ''}
                                variant="standard"
                                size={'small'}
                            />

                        </Box>
                        <Box display={'flex'} margin={'20px'} gap={'20px'}>
                            <Button
                                variant={'contained'}
                                onClick={updatePrices}
                                color={'secondary'}
                            > Ок
                            </Button>
                            <Button
                                variant={'contained'}
                                onClick={() => {
                                    setPriceChecked('');
                                    closeModal()
                                }}
                            > Отмена
                            </Button>
                        </Box>
                    </Box>
                </Modal>
        );
    }
}

export default PriceView;
