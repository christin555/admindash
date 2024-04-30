import React from 'react';
import {inject} from 'mobx-react';
import {
  DataGrid,
  ruRU
} from '@mui/x-data-grid';
import {toJS} from 'mobx';
import {status as statusEnum} from '../../enums';
import {withStyles} from '@mui/styles';
import s from './style.module.scss';
import {IconButton} from '@mui/material';
import Box from '@mui/material/Box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs from 'dayjs';
import formatLogs from './formatLogs';
import formatLogsName from './formatLogsName';
import Button from '../../shared/Button';
import renderCard from './renderCard';

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
    priceUnitGrouped: ListStore.priceUnitGrouped,
    tab: ListStore.tab,
    setDrawerCardShow: ListStore.setDrawerCardShow
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
          flex: 1,
          renderCell: (cellValues) => formatLogsName(cellValues.row.action)
        },
        {
          field: 'data',
          headerName: 'Детали',
          minWidth: 200,
          flex: 1,
          renderCell: (cellValues) => formatLogs(cellValues.row)
        },
        {
          field: 'created_at',
          headerName: 'Дата',
          minWidth: 100,
          flex: 1,
          renderCell: (cellValues) => dayjs(cellValues.row.created_at).format('DD.MM.YYYY HH:mm') || 'Не указано'
        }
      ],
      'stockArrival': [
        {
          field: 'id',
          headerName: 'Номер',
          maxWidth: 80,
          flex: 1,
          renderCell: (cellValues) => <span className={s.id}>#{cellValues.row.id}</span>
        },
        {
          field: 'name',
          headerName: 'Товар',
          minWidth: 300,
          flex: 1,
          renderCell: ({row}) => renderCard({row, setDrawerCardShow: this.props.setDrawerCardShow})
        },
        {
          field: 'amount',
          flex: 1,
          headerName: 'Колво упаковок',
          minWidth: 150,
          renderCell: (cellValues) => {
            const count = cellValues.row.amount || '0';

            return <span className={s.amount}> {count} уп.</span>;
          }
        },
        {
          field: 'dateArrival',
          headerName: 'Дата прихода',
          minWidth: 100,
          flex: 1,
          renderCell: (cellValues) => dayjs(cellValues.row.dateArrival).format('DD.MM.YYYY') || 'Не указано'
        },
        {
          field: 'isReceived',
          headerName: 'Получен',
          minWidth: 100,
          flex: 1,
          renderCell: (cellValues) => cellValues.row.isReceived ? 'да' : 'нет'
        },
        {
          field: 'updated_at',
          headerName: 'Дата обновления',
          minWidth: 100,
          flex: 1,
          renderCell: (cellValues) => dayjs(cellValues.row.updated_at).format('DD.MM.YYYY HH:mm') || 'Не указано'
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
          field: 'name',
          headerName: 'Товар',
          minWidth: 300,
          flex: 1,
          renderCell: ({row}) => renderCard({row, setDrawerCardShow: this.props.setDrawerCardShow})
        },
        {
          field: 'amount',
          flex: 1,
          headerName: 'Продано упаковок',
          minWidth: 150,
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
        }
      ],
      'stock': [
        {
          field: 'name',
          headerName: 'Товар',
          minWidth: 400,
          flex: 1,
          renderCell: ({row}) => renderCard({row, setDrawerCardShow: this.props.setDrawerCardShow})
        },
        {
          field: 'amount',
          flex: 1,
          headerName: 'В наличии на складе',
          minWidth: 200,
          maxWidth: 250,
          renderCell: (cellValues) => {
            const count = cellValues.row.amount || '0';

            return <span className={s.amount}> {count} уп.</span>;
          }
        },
        {
          field: 'next',
          flex: 1,
          headerName: 'Ожидается',
          minWidth: 250,
          maxWidth: 350,
          renderCell: (cellValues) => {
            const {next} = cellValues.row;

            if (!next) {
              return;
            }

            const blocks = next.map(({dateArrival, amount}) => (
              <div key={`${dateArrival}_${amount}`}>
                <span className={s.dateArrival}>{dayjs(dateArrival).format('DD.MM.YYYY')}
                </span>
                {` - ${amount} уп.`}
              </div>
            ));

            return (
              <Box display={'flex'} flexDirection={'column'} gap={'10px'} padding={'10px 0'}>
                {blocks}
              </Box>
            );
          }
        },
        {
          field: 'updated_at',
          headerName: 'Дата обновления',
          minWidth: 100,
          maxWidth: 160,
          flex: 1,
          renderCell: (cellValues) => dayjs(cellValues.row.updated_at).format('DD.MM.YYYY HH:mm') || 'Не указано'
        }
      ]
    };
  }

  render() {
    const {
      list,
      setSelected,
      isEdit,
      status,
      setLimit,
      limit,
      selected,
      tab
    } = this.props;

    return (
      <StyledDataGrid
        loading={status === statusEnum.LOADING}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        autoHeight={true}
        rows={list}
        columns={this.columns[tab]}
        pageSize={limit}
        rowsPerPageOptions={[20, 50, 100]}
        onPageSizeChange={setLimit}
        checkboxSelection={isEdit}
        disableSelectionOnClick={true}
        selectionModel={selected}
        onSelectionModelChange={setSelected}
        disableColumnMenu={true}
        //   autoPageSize
      />
    );
  }
}

export default PriceView;
