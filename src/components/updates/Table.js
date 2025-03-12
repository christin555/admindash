import React from 'react';
import {inject} from 'mobx-react';
import {toJS} from 'mobx';
import TableView from '../../shared/Table';
import {status as statusEnum} from '../../enums';
import ShowMore from './ShowMore';
import dayjs from 'dayjs';

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
        field: 'createdAt',
        headerName: 'Дата',
        width: 150,
        renderCell: (cellValues) => dayjs(cellValues.row.createdAt).format('DD.MM.YYYY HH:mm') || 'Не указано'
      },
      {
        field: 'action',
        headerName: 'Название',
        width: 280
      },
      {
        field: 'status',
        headerName: 'Статус',
        width: 150,
        renderCell: (cellValues) => cellValues.row.status === statusEnum.SUCCESS ? 'Выполнено' : 'Ошибка'
      },
      {
        field: 'data',
        headerName: 'Информация',
        minWidth: 300,
        flex: 1,
        align: 'start',
        renderCell: (cellValues) => {
          const text = cellValues.row.data;
          const array = JSON.parse(text).join('\n');

          return <ShowMore text={array} />;
        }
      },
      {
        field: 'createdItems',
        headerName: 'Добавленные',
        flex: 1
      },
      {
        field: 'undefinedItems',
        headerName: 'Ненайденные',
        minWidth: 350,
        flex: 1,
        renderCell: (cellValues) => {
          const text = cellValues.row.undefinedItems || '';

          return <ShowMore text={text} />;
        }
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
      <TableView
        withToolbar={false}
        status={status}
        list={list}
        columns={this.columns}
        limit={limit}
        setLimit={setLimit}
        isEdit={isEdit}
        selected={selected}
        setSelected={setSelected}
      />
    );
  }
}

export default PriceView;
