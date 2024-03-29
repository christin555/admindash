import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

import {Modal, Typography} from "@mui/material";

@inject(({ProductsStore}) => {
    return {
        isModalDeleteShow: ProductsStore.isModalDeleteShow,
        toggleModalDeleteShow: ProductsStore.toggleModalDeleteShow,
        selected: ProductsStore.selected,
        setDeleteIds: ProductsStore.setDeleteIds
    };
})
class PriceView extends React.Component {
    render() {
        const {
            isModalDeleteShow,
            toggleModalDeleteShow,
            setDeleteIds,
            selected
        } = this.props;

        return (
                <Modal
                    open={isModalDeleteShow}
                    onClose={toggleModalDeleteShow}
                >
                    <Box className={s.modal}>
                        <Box>
                            <Typography id="modal-modal-title" variant="body2" component="h2">
                                Вы уверены, что хотите удалить {selected?.length} товар(а)?
                            </Typography>
                        </Box>
                        <Box display={'flex'}  margin={'30px 0 10px'} gap={'20px'}>
                            <Button
                                variant={'contained'}
                                onClick={setDeleteIds}
                                color={'secondary'}
                            > Да
                            </Button>
                            <Button
                                variant={'contained'}
                                onClick={toggleModalDeleteShow}
                            > Отмена
                            </Button>
                        </Box>
                    </Box>
                </Modal>
        );
    }
}

export default PriceView;
