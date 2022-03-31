import React from 'react';
import {inject} from 'mobx-react';
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer, GridToolbarDensitySelector,
    GridToolbarExport, GridToolbarFilterButton,
    ruRU
} from '@mui/x-data-grid';
import {toJS} from "mobx";
import {TextField} from "@mui/material";
import {status as statusEnum} from '../../enums';

function CustomToolbar() {
    return (
        <GridToolbarContainer style={{margin: '10px', gap: '10px'}}>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
            <GridToolbarExport csvOptions={{fileName: 'Экспорт', utf8WithBom: true}}/>
        </GridToolbarContainer>
    );
}

@inject(({PriceStore}) => {
    return {
        products: toJS(PriceStore.products) || [],
        status: PriceStore.status,
        isEdit: PriceStore.isEdit,
        setPrice: PriceStore.setPrice,
        setSelected: PriceStore.setSelected,
        setLimit: PriceStore.setLimit,
        limit: PriceStore.limit,
        category: PriceStore.category,
        categories: PriceStore.categories
    };
})
class PriceView extends React.Component {
    get kerama() {
        return this.props.categories?.find(({name}) => name.toLowerCase() === 'керамогранит')?.value
    }

    columns = [
        {
            field: 'name', headerName: 'Название', width: 350,
            renderCell: (cellValues) => <a target="_blank" and rel="noopener noreferrer"
                                           href={`https://master-pola.com/product/${cellValues.row.alias}`}> {cellValues.row.name} </a>,
        },
        {field: 'collection', headerName: 'Коллекция', width: 290},
        {field: 'brand', headerName: 'Бренд', width: 290},
        {field: 'size', headerName: 'Размеры', width: 150, hide: true},
        {
            field: 'price', headerName: 'Цена, руб', width: 290,
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
                rows={products}
                columns={this.columns}
                pageSize={limit}
                rowsPerPageOptions={[20, 50, 100]}
                onPageSizeChange={setLimit}
                checkboxSelection={isEdit}
                disableSelectionOnClick
                onSelectionModelChange={setSelected}
                components={{
                    Toolbar: CustomToolbar,
                }}
                disableColumnMenu={true}
                //   autoPageSize
            />
        );
    }
}

export default PriceView;
