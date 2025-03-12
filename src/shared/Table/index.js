import React from 'react';
import {
  DataGrid,
  ruRU
} from '@mui/x-data-grid';
import {status as statusEnum} from '../../enums';
import {withStyles} from '@mui/styles';
import CustomToolbar from './CustomToolbar';

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

const TableView = (props) => {
  const {
    list,
    setSelected,
    isEdit,
    status,
    setLimit,
    limit,
    selected,
    columns,
    withToolbar = true
  } = props;

  return (
    <StyledDataGrid
      loading={status === statusEnum.LOADING}
      localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
      autoHeight={true}
      rows={list}
      columns={columns}
      pageSize={limit}
      rowsPerPageOptions={[20, 50, 100]}
      onPageSizeChange={setLimit}
      checkboxSelection={isEdit}
      disableSelectionOnClick={true}
      selectionModel={selected}
      onSelectionModelChange={setSelected}
      components={{
        Toolbar: withToolbar ? CustomToolbar : null
      }}
      disableColumnMenu={true}
      {...props}
    />
  );
};

export default TableView;
