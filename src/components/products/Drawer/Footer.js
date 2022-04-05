import React from 'react';
import {inject} from 'mobx-react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

@inject(({DrawerStore}) => {
    return {
        apply: DrawerStore.apply,
        reset: DrawerStore.reset,
        mode: DrawerStore.mode
    };
})
class DrawerStore extends React.Component {
    render() {
        const {
            apply,
            reset,
            mode
        } = this.props;

        return mode !== 'show' && <Box
                display={'flex'}
                margin={'20px'}
                gap={'20px'}
            >
                <Button
                    variant={'contained'}
                    onClick={apply}
                > Сохранить
                </Button>
                <Button
                    variant={'contained'}
                    onClick={reset}
                    color={'secondary'}
                > Отмена
                </Button>
            </Box>
            || null;

    }
}

export default DrawerStore;
