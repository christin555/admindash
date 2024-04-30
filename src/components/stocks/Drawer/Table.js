import React from 'react';
import {inject} from 'mobx-react';
import {
  DataGrid,
  ruRU
} from '@mui/x-data-grid';
import {toJS} from 'mobx';
import {status as statusEnum} from '../../../enums';
import {withStyles} from '@mui/styles';
import s from './style.module.scss';
import {IconButton} from '@mui/material';
import Box from '@mui/material/Box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs from 'dayjs';
import formatLogs from '../formatLogs';
import formatLogsName from '../formatLogsName';

const StyledDataGrid = withStyles({
  root: {
    '& .MuiDataGrid-renderingZone': {
      maxHeight: 'none !important',
      minHeight: '200px'
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
      minHeight: '200px',
      height: '100% !important'
    }
  }
})(DataGrid);

@inject(({DrawerCardStore, ListStore}) => {
  return {
    list: toJS(DrawerCardStore.TableStore.list) || [],
    status: DrawerCardStore.TableStore.status,
    setLimit: DrawerCardStore.TableStore.setLimit,
    limit: DrawerCardStore.TableStore.limit,
    tab: DrawerCardStore.tab,
    openDrawerWithMode: ListStore.openDrawerWithMode
  };
})
class PriceView extends React.Component {
  get columns() {

    return {
      'logs': [
        {
          field: 'id',
          headerName: 'Номер',
          maxWidth: 80,
          flex: 1,
          renderCell: (cellValues) => <span className={s.id}> #{cellValues.row.id}</span>
        },
        {
          field: 'action',
          headerName: 'Действие',
          minWidth: 100,
          maxWidth: 300,
          flex: 1,
          renderCell: (cellValues) => formatLogsName(cellValues.row.action)
        },
        {
          field: 'data',
          headerName: 'Детали',
          minWidth: 300,
          maxWidth: 500,
          flex: 1,
          renderCell: (cellValues) => formatLogs(cellValues.row)
        },
        {
          field: 'created_at',
          headerName: 'Дата',
          maxWidth: 150,
          flex: 1,
          renderCell: (cellValues) => dayjs(cellValues.row.created_at).format('DD.MM.YYYY HH:mm') || 'Не указано'
        }
      ],
      'stockArrival': [
        {
          field: 'id',
          headerName: 'Номер',
          minWidth: 100,
          maxWidth: 200,
          flex: 1,
          renderCell: (cellValues) => <span className={s.id}> #{cellValues.row.id}</span>
        },
        {
          field: 'amount',
          flex: 1,
          headerName: 'Колво упаковок',
          minWidth: 100,
          maxWidth: 200,
          renderCell: (cellValues) => {
            const count = cellValues.row.amount || '0';

            return <span className={s.amount}> {count} уп.</span>;
          }
        },
        {
          field: 'dateArrival',
          headerName: 'Дата прихода',
          minWidth: 100,
          maxWidth: 200,
          flex: 1,
          renderCell: (cellValues) => dayjs(cellValues.row.dateArrival).format('DD.MM.YYYY') || 'Не указано'
        },
        {
          field: 'isReceived',
          headerName: 'Получен',
          minWidth: 100,
          maxWidth: 200,
          flex: 1,
          renderCell: (cellValues) => cellValues.row.isReceived ? 'да' : 'нет'
        },
        {
          field: 'updated_at',
          headerName: 'Дата обновления',
          minWidth: 100,
          maxWidth: 200,
          flex: 1,
          renderCell: (cellValues) => dayjs(cellValues.row.updated_at).format('DD.MM.YYYY HH:mm') || 'Не указано'
        }
      ],
      'sales': [
        {
          field: 'id',
          headerName: 'Номер',
          maxWidth: 80,
          flex: 1,
          renderCell: (cellValues) => <span className={s.id}> #{cellValues.row.id}</span>
        },
        {
          field: 'amount',
          flex: 1,
          headerName: 'Продано упаковок',
          minWidth: 100,
          maxWidth: 200,
          renderCell: (cellValues) => {
            const count = cellValues.row.amount || '0';

            return <span className={s.amount}> {count} уп.</span>;
          }
        },
        {
          field: 'saleDate',
          headerName: 'Дата продажи',
          minWidth: 100,
          flex: 1,
          renderCell: (cellValues) => dayjs(cellValues.row.saleDate).format('DD.MM.YYYY') || 'Не указано'
        },
        {
          field: 'notes',
          flex: 1,
          headerName: 'Заметки',
          minWidth: 150,
          renderCell: (cellValues) => cellValues.row.notes
        },
        {
          field: 'updated_at',
          headerName: 'Дата обновления',
          minWidth: 100,
          flex: 1,
          renderCell: (cellValues) => dayjs(cellValues.row.updated_at).format('DD.MM.YYYY HH:mm') || 'Не указано'
        }
      ],
      'stock': [
        {
          field: 'id',
          headerName: 'Номер',
          maxWidth: 80,
          flex: 1,
          renderCell: (cellValues) => <span className={s.id}> #{cellValues.row.id}</span>
        },
        {
          field: 'action',
          headerName: 'Действие',
          minWidth: 100,
          maxWidth: 200,
          flex: 1,
          renderCell: (cellValues) => formatLogsName(cellValues.row.action)
        },
        {
          field: 'amount',
          headerName: 'Количество',
          minWidth: 100,
          maxWidth: 200,
          flex: 1,
          renderCell: (cellValues) =>
            `${cellValues.row.action === 'addStock' ? '+' : ''}${cellValues.row.data?.amount} уп.`
        },
        {
          field: 'stockCount',
          headerName: 'Остаток на складе',
          minWidth: 100,
          maxWidth: 200,
          flex: 1,
          renderCell: (cellValues) => `${cellValues.row.data?.stockCount} уп.`
        },
        {
          field: 'reason',
          headerName: 'Причина',
          minWidth: 100,
          flex: 1,
          renderCell: (cellValues) => {
            const {reason, reasonId} = cellValues.row.data || {};

            return reason ? <span>{reason} #{reasonId}</span> : null;
          }
        },
        {
          field: 'created_at',
          headerName: 'Дата',
          maxWidth: 150,
          flex: 1,
          renderCell: (cellValues) => dayjs(cellValues.row.created_at).format('DD.MM.YYYY HH:mm') || 'Не указано'
        }
      ]
    };
  }

  render() {
    const {
      list,
      status,
      setLimit,
      limit,
      tab
    } = this.props;

    return (
      <StyledDataGrid
        height={'100%'}
        loading={status === statusEnum.LOADING}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        autoHeight={false}
        rows={list}
        columns={this.columns[tab]}
        pageSize={limit}
        rowsPerPageOptions={[20, 50, 100]}
        onPageSizeChange={setLimit}
        disableSelectionOnClick={true}
        disableColumnMenu={true}
        //   autoPageSize
      />
    );
  }
}

export default PriceView;
