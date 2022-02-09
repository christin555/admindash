import React from 'react';
import {inject} from 'mobx-react';
import {DataGrid, ruRU} from '@mui/x-data-grid';
import {toJS} from "mobx";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import s from './style.module.scss';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {status as statusEnum} from '../../enums';
import {AppBar, Modal, Typography} from "@material-ui/core";
import Table from "./Table";

@inject(({PriceStore}) => {
    return {
        categories: toJS(PriceStore.categories) || [],
        setCategory: PriceStore.setCategory,
        category: PriceStore.category,
        toggleEdit: PriceStore.toggleEdit,
        isEdit: PriceStore.isEdit,
        reset: PriceStore.reset,
        save: PriceStore.save,
        fastFilterInput: PriceStore.fastFilterInput,
        setFastFilter: PriceStore.setFastFilter,
        setFastFilterInput: PriceStore.setFastFilterInput
    };
})
class PriceView extends React.Component {
    render() {
        const {
            categories,
            reset,
            isEdit,
            toggleEdit,
            category,
            setCategory,
            save,
            fastFilterInput,
            setFastFilterInput,
            setFastFilter
        } = this.props;

        return (
            <React.Fragment>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs variant="scrollable" value={category} onChange={setCategory} aria-label="basic tabs example">
                        {
                            categories.map(({id, name}) => <Tab
                                key={name}
                                value={id}
                                label={name}
                            />)
                        }
                    </Tabs>
                </Box>
                <Box margin={'20px 0'} display={'flex'} gap={'20px'} justifyContent={'flex-end'}>

                    <Box width={'290px'}>
                        <TextField
                            onChange={({target: {value}}) => setFastFilterInput(value)}
                            onBlur={setFastFilter}
                            value={fastFilterInput || ''}
                            size={'small'}
                            fullWidth={true}
                            placeholder={'Поиск'}
                        />
                    </Box>
                    {
                        !isEdit && <Button variant={'contained'} onClick={toggleEdit}> Редактировать </Button>
                        || <>
                            <Button variant={'contained'} onClick={save} color={'secondary'}> Сохранить </Button>
                            <Button variant={'contained'} onClick={reset}> Отмена </Button>
                        </>
                    }
                </Box>

            </React.Fragment>
        );
    }
}

export default PriceView;
