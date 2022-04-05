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
import {withStyles} from "@material-ui/core/styles";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {IconButton} from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import VisibilityIcon from '@mui/icons-material/Visibility';

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

const StyledDataGrid = withStyles({
    root: {
        "& .MuiDataGrid-renderingZone": {
            maxHeight: "none !important"
        },
        "& .MuiDataGrid-cell": {
            lineHeight: "unset !important",
            maxHeight: "none !important",
            whiteSpace: "normal !important",
        },
        "& .MuiDataGrid-row": {
            maxHeight: "none !important"
        },
        "& .MuiDataGrid-virtualScrollerRenderZone": {
            position: "relative !important"
        },
        "& .MuiDataGrid-virtualScrollerContent": {
            height: "auto !important"
        }
    }
})(DataGrid);

@inject(({ProductsStore}) => {
    return {
        products: toJS(ProductsStore.products) || [],
        status: ProductsStore.status,
        isEdit: ProductsStore.isEdit,
        setPrice: ProductsStore.setPrice,
        setSelected: ProductsStore.setSelected,
        selected: ProductsStore.selected,
        setLimit: ProductsStore.setLimit,
        limit: ProductsStore.limit,
        category: ProductsStore.category,
        categories: ProductsStore.categories,
        columns: ProductsStore.columns,
        openDrawerWithMode: ProductsStore.openDrawerWithMode
    };
})
class PriceView extends React.Component {
    baseColumns = [
        {
            field: 'img',
            headerName: 'Фото',
            flex: 1,
            minWidth: 150,
            renderCell: (cellValues) => {
                const src = cellValues.row.imgs?.find(({isMain}) => isMain === true)?.src
                return src && <img src={src}/> || null
            }
        },
        {
            field: 'name',
            headerName: 'Название',
            minWidth: 350,
            flex: 1,
            renderCell: (cellValues) =>
                <a target="_blank"
                   rel="noopener noreferrer"
                   href={`https://master-pola.com/product/${cellValues.row.alias}`}
                >
                    {cellValues.row.name}
                </a>,
        },
        {
            field: 'collection',
            flex: 1,
            headerName: 'Коллекция',
            minWidth: 290
        },
        {
            field: 'brand',
            flex: 1,
            headerName: 'Бренд',
            minWidth: 290
        },
        {
            field: 'price',
            flex: 1,
            headerName: 'Цена, руб',
            minWidth: 150,
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
        {
            field: 'actions',
            flex: 1,
            headerName: '',
            minWidth: 150,
            renderCell: (cellValues) => {
                return <Box display={'flex'} gap={'5px'}>
                    <IconButton
                        onClick={() => this.props.openDrawerWithMode('copy', cellValues.row)}
                        children={<ContentCopyIcon/>}
                        variant="standard"
                        size={'small'}
                    />
                    <IconButton
                        onClick={() => this.props.openDrawerWithMode('edit', cellValues.row)}
                        children={<EditIcon/>}
                        variant="standard"
                        size={'small'}
                    />
                    <IconButton
                        onClick={() => this.props.openDrawerWithMode('show', cellValues.row)}
                        children={<VisibilityIcon/>}
                        variant="standard"
                        size={'small'}
                    />
                </Box>
            }
        },
    ];

    get columns() {
        return [...this.baseColumns, ...this.props.columns]
    }

    render() {
        const {
            products,
            setSelected,
            isEdit,
            status,
            setLimit,
            limit,
            selected
        } = this.props;

        return (
            <StyledDataGrid
                loading={status === statusEnum.LOADING}
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                autoHeight={true}
                rows={products}
                columns={this.columns}
                pageSize={limit}
                rowsPerPageOptions={[20, 50, 100]}
                onPageSizeChange={setLimit}
                checkboxSelection={isEdit}
                disableSelectionOnClick
                selectionModel={selected}
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
