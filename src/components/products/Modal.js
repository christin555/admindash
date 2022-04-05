import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";

import {Modal, Typography} from "@material-ui/core";

@inject(({ProductsStore}) => {
    return {
        isModalShow: ProductsStore.isModalShow,
        closeModal: ProductsStore.closeModal,
        setPriceChecked: ProductsStore.setPriceChecked,
        checkedPrice: ProductsStore.checkedPrice,
        updatePrices: ProductsStore.updatePrices,
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
                        <Typography id="modal-modal-title" variant="subtitle1" component="h2">
                            Новая цена
                        </Typography>
                        <TextField
                            style={{marginTop: '20px'}}
                            onChange={({target: {value}}) => setPriceChecked(value)}
                            value={checkedPrice || ''}
                            variant="outlined"
                            size={'small'}
                        />
                    </Box>
                    <Box display={'flex'} margin={'30px 0 20px'} gap={'20px'}>
                        <Button
                            variant={'contained'}
                            onClick={updatePrices}
                            color={'secondary'}
                        > Сохранить
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
