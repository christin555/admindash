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
import {status as statusEnum, posts} from '../../enums';
import {withStyles} from "@mui/styles";
import s from './style.module.scss';

function CustomToolbar() {
    return (
        <GridToolbarContainer style={{margin: '10px', gap: '10px'}} className={s.toolbar}>
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

@inject(({ListStore}) => {
    return {
        list: toJS(ListStore.list) || [],
        status: ListStore.status,
        isEdit: ListStore.isEdit,
        setSelected: ListStore.setSelected,
        selected: ListStore.selected,
        setLimit: ListStore.setLimit,
        limit: ListStore.limit,
        openDrawerWithMode: ListStore.openDrawerWithMode
    };
})
class PriceView extends React.Component {
    get columns() {
        return [
            {
                field: 'name',
                headerName: 'Название',
                minWidth: 350,
                flex: 1,
                renderCell: (cellValues) => cellValues.row.name
            },
            {
                field: 'weight',
                headerName: 'Порядок',
                minWidth: 350,
                flex: 1,
                renderCell: (cellValues) => cellValues.row.weight
            },
            {
                field: 'category',
                headerName: 'Категория',
                minWidth: 350,
                flex: 1,
                renderCell: (cellValues) => cellValues.row.category
            }
       ]
    }

    render() {
        const {
            list,
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
                rows={list}
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
