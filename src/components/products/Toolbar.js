import React from 'react';
import {inject} from 'mobx-react';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import s from './style.module.scss';

@inject(({ProductsStore}) => {
    return {
        toggleEdit: ProductsStore.toggleEdit,
        isEdit: ProductsStore.isEdit,
        reset: ProductsStore.reset,
        save: ProductsStore.save,
        fastFilterInput: ProductsStore.fastFilterInput,
        setFastFilter: ProductsStore.setFastFilter,
        setFastFilterInput: ProductsStore.setFastFilterInput,
        openDrawerWithMode: ProductsStore.openDrawerWithMode
    };
})
class Toolbar extends React.Component {
    render() {
        const {
            reset,
            isEdit,
            toggleEdit,
            save,
            fastFilterInput,
            setFastFilterInput,
            setFastFilter
        } = this.props;

        return (
                <Box className ={s.menu} margin={'20px 0'} display={'flex'} gap={'20px'} justifyContent={'space-between'}>
                    <Box width={'390px'} className={s.search}>
                        <TextField
                            onChange={({target: {value}}) => setFastFilterInput(value)}
                            onBlur={setFastFilter}
                            value={fastFilterInput || ''}
                            size={'small'}
                            fullWidth={true}
                            placeholder={'Поиск по названию, коллекции или бренду'}
                        />
                    </Box>
                    <Box display={'flex'} gap={'20px'}>
                        {
                            !isEdit && <>
                                <Button variant={'contained'} onClick={toggleEdit}> Редактировать </Button>
                                <Button variant={'contained'} color={'secondary'}
                                        onClick={() => this.props.openDrawerWithMode('add')}> Добавить </Button>
                            </>
                            || <>
                                <Button variant={'contained'} onClick={save} > Сохранить </Button>
                                <Button variant={'contained'} onClick={reset} color={'secondary'}> Отмена </Button>
                            </>
                        }
                    </Box>
                </Box>
        );
    }
}

export default Toolbar;
