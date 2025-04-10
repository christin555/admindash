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
import {TextField} from '@mui/material';
import {status as statusEnum} from '../../enums';
import {withStyles} from '@mui/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {IconButton} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import s from './style.module.scss';
import dayjs from 'dayjs';

function CustomToolbar() {
  return (
    <GridToolbarContainer style={{margin: '10px', gap: '10px'}} className={s.toolbar}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
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

@inject(({ProductsStore}) => {
  return {
    products: toJS(ProductsStore.list) || [],
    status: ProductsStore.status,
    isEdit: ProductsStore.isEdit,
    setPrice: ProductsStore.setPrice,
    setSelected: ProductsStore.setSelected,
    selected: ProductsStore.selected,
    setLimit: ProductsStore.setLimit,
    limit: ProductsStore.limit,
    category: ProductsStore.category,
    categories: ProductsStore.categories,
    columns: toJS(ProductsStore.columns),
    openDrawerWithMode: ProductsStore.openDrawerWithMode,
    showColumns: ProductsStore.showColumns,
    setShowColumns: ProductsStore.setShowColumns
  };
})
class PriceView extends React.Component {
    baseColumns = [
      {
        field: 'img',
        headerName: 'Фото',
        width: 100,
        renderCell: (cellValues) => {
          const src = cellValues.row.imgs?.find(({isMain}) => isMain === true)?.src;
          const _src = `https://master-pola.com${src}`;

          return src && <img src={_src} height={'50px'} /> || null;
        }
      },
      {
        field: 'name',
        headerName: 'Название',
        minWidth: 300,
        flex: 1,
        renderCell: (cellValues) => (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={`https://master-pola.com/product/${cellValues.row.alias}`}
          >
            {cellValues.row.name}
          </a>
        )
      },
      {
        field: 'actions',
        headerName: '',
        width: 120,
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
        field: 'collection',
        flex: 1,
        headerName: 'Коллекция',
        minWidth: 200
      },
      {
        field: 'brand',
        flex: 1,
        headerName: 'Бренд',
        minWidth: 150
      },
      {
        field: 'price',
        flex: 1,
        headerName: 'Цена, руб',
        minWidth: 100,
        renderCell: (cellValues) => {
          if (!this.props.isEdit) {
            return cellValues.value;
          }

          return (
            <TextField
              onChange={({target: {value}}) => this.props.setPrice(cellValues.row.id, value)}
              value={cellValues.value || ''}
              variant='standard'
              size={'small'}
            />
          );
        }
      },
      {
        field: 'salePrice',
        flex: 1,
        headerName: 'Цена со скидкой, руб',
        minWidth: 100,
        renderCell: (cellValues) => {
          if (!this.props.isEdit) {
            return cellValues.value;
          }

          return (
            <TextField
              onChange={({target: {value}}) => this.props.setPrice(cellValues.row.id, value)}
              value={cellValues.value || ''}
              variant='standard'
              size={'small'}
            />
          );
        }
      },
      {
        field: 'priceUpdatedAt',
        headerName: 'Дата обновления цены',
        minWidth: 100,
        flex: 1,
        renderCell: (cellValues) => dayjs(cellValues.row.priceUpdatedAt).format('DD.MM.YYYY HH:mm') || 'Не указано'
      }
    ];

    get columns() {
      const {showColumns} = this.props;

      return [...this.baseColumns, ...this.props.columns].map((column) => {

        return {
          ...column,
          hide: !showColumns[column.field]
        };
      });
    }

    render() {
      const {
        products,
        setSelected,
        isEdit,
        status,
        setLimit,
        limit,
        selected,
        setShowColumns
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
          disableSelectionOnClick={true}
          selectionModel={selected}
          onSelectionModelChange={setSelected}
          onColumnVisibilityChange={setShowColumns}
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
