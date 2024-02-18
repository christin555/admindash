import React from 'react';
import {inject} from 'mobx-react';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer, GridToolbarDensitySelector,
  GridToolbarExport, GridToolbarFilterButton,
  ruRU
} from '@mui/x-data-grid';
import {toJS} from 'mobx';
import {status as statusEnum} from '../../enums';
import {withStyles} from '@mui/styles';
import s from './style.module.scss';
import {IconButton, TextField} from '@mui/material';
import Box from '@mui/material/Box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

function CustomToolbar() {
  return (
    <GridToolbarContainer style={{margin: '10px', gap: '10px'}} className={s.toolbar}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport csvOptions={{fileName: 'Экспорт', utf8WithBom: true}} />
    </GridToolbarContainer>
  );
}

const StyledDataGrid = withStyles({
  root: {
    '& .MuiDataGrid-renderingZone': {
      maxHeight: 'none !important'
    },
    '& .MuiDataGrid-cell': {
      lineHeight: 'unset !important',
      maxHeight: 'none !important',
      whiteSpace: 'normal !important'
    },
    '& .MuiDataGrid-row': {
      maxHeight: 'none !important'
    },
    '& .MuiDataGrid-virtualScrollerRenderZone': {
      position: 'relative !important'
    },
    '& .MuiDataGrid-virtualScrollerContent': {
      height: 'auto !important'
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
    openDrawerWithMode: ListStore.openDrawerWithMode,
    priceUnitGrouped: ListStore.priceUnitGrouped
  };
})
class PriceView extends React.Component {
  get columns() {
    return [
      {
        field: 'img',
        headerName: 'Фото',
        width: 100,
        renderCell: (cellValues) => {
          const src = cellValues.row.img;

          return src && <img src={src} height={'50px'} /> || null;
        }
      },
      {
        field: 'name',
        headerName: 'Название',
        minWidth: 350,
        flex: 1,
        renderCell: (cellValues) => cellValues.row.name
      },
      {
        field: 'actions',
        flex: 1,
        headerName: '',
        minWidth: 150,
        renderCell: (cellValues) => (
          <Box display={'flex'} gap={'5px'}>
            <IconButton
              onClick={() => this.props.openDrawerWithMode('copy', cellValues.row)}
              children={<ContentCopyIcon />}
              variant='standard'
              size={'small'}
            />
            <IconButton
              onClick={() => this.props.openDrawerWithMode('edit', cellValues.row)}
              children={<EditIcon />}
              variant='standard'
              size={'small'}
            />
            <IconButton
              onClick={() => this.props.openDrawerWithMode('show', cellValues.row)}
              children={<VisibilityIcon />}
              variant='standard'
              size={'small'}
            />
          </Box>
        )
      },
      {
        field: 'order',
        headerName: 'Порядок',
        minWidth: 350,
        flex: 1,
        renderCell: (cellValues) => cellValues.row.weight
      },
      {
        field: 'price',
        flex: 1,
        headerName: 'Цена',
        minWidth: 150,
        renderCell: (cellValues) => {
          const price = cellValues.value;

          if (!price) {
            return;
          }

          const {priceUnitGrouped} = this.props;
          const unit = priceUnitGrouped[cellValues.row.unit]?.label;

          return `${price} ${unit}`;
        }
      },
      {
        field: 'priceUpdatedAt',
        headerName: 'Дата обновления цены',
        minWidth: 100,
        flex: 1,
        renderCell: (cellValues) => cellValues.row.priceUpdatedAt || 'Не указано'
      }
    ];
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
        disableSelectionOnClick={true}
        selectionModel={selected}
        onSelectionModelChange={setSelected}
        components={{
          Toolbar: CustomToolbar
        }}
        disableColumnMenu={true}
        //   autoPageSize
      />
    );
  }
}

export default PriceView;
