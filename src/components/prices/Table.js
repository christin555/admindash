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

@inject(({PriceStore}) => {
    return {
        products: toJS(PriceStore.products) || [],
        status: PriceStore.status,
        isEdit: PriceStore.isEdit,
        setPrice: PriceStore.setPrice,
        setSelected: PriceStore.setSelected,
        setLimit: PriceStore.setLimit,
        limit: PriceStore.limit
    };
})
class PriceView extends React.Component {
    columns = [
        {
            field: 'name', headerName: 'Название', width: 350,
            renderCell: (cellValues) => <a target="_blank" and rel="noopener noreferrer"
                                           href={`https://master-pola.com/product/${cellValues.row.alias}`}> {cellValues.row.name} </a>,
        },
        {field: 'collection', headerName: 'Коллекция', width: 290},
        {field: 'brand', headerName: 'Бренд', width: 290},
        {
            field: 'price', headerName: 'Цена', width: 290,
            renderCell: (cellValues) => {
                if (!this.props.isEdit) {
                    return cellValues.value
                }
                return <TextField
                    onChange={({target: {value}}) => this.props.setPrice(cellValues.row.id, value)}
                    value={cellValues.value || ''}
                    variant="standard"
                    size={'small'}
                />
            }
        },
    ];

    render() {
        const {
            products,
            setSelected,
            isEdit,
            status,
            setLimit,
            limit,
        } = this.props;

        return (
                <DataGrid
                    loading={status === statusEnum.LOADING}
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    autoHeight
                    autoPageSize
                    rows={products}
                    columns={this.columns}
                    pageSize={limit}
                    rowsPerPageOptions={[20, 50, 100]}
                    onPageSizeChange={setLimit}
                    checkboxSelection={isEdit}
                    disableSelectionOnClick
                    onSelectionModelChange={setSelected}
                />
        );
    }
}

export default PriceView;
