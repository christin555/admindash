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
import {status as statusEnum, posts} from '../../enums';
import {withStyles} from "@mui/styles";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import VisibilityIcon from '@mui/icons-material/Visibility';
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

const typesNames = {
    [posts.WORKS]: 'работы',
    [posts.PRODUCT]: 'каталог-товары',
    [posts.OTHER]: 'другое'
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

@inject(({PostsStore}) => {
    return {
        list: toJS(PostsStore.list) || [],
        status: PostsStore.status,
        isEdit: PostsStore.isEdit,
        setSelected: PostsStore.setSelected,
        selected: PostsStore.selected,
        setLimit: PostsStore.setLimit,
        limit: PostsStore.limit,
        openDrawerWithMode: PostsStore.openDrawerWithMode
    };
})
class PriceView extends React.Component {
    baseColumns = [
        {
            field: 'img',
            headerName: 'Фото',
            width: 100,
            renderCell: (cellValues) => {
                const src = cellValues.row.imgPreview;
                if (!src) {
                    return null;
                }
                const _src = src.includes('https') ? src : 'https://master-pola.com' + src;
                return <img src={_src} height={'50px'}/> || null
            }
        },
        {
            field: 'title',
            headerName: 'Название',
            minWidth: 350,
            flex: 1,
            renderCell: (cellValues) =>
                <a target="_blank"
                   rel="noopener noreferrer"
                   href={`https://master-pola.com/blog/article/${cellValues.row.alias}`}
                >
                    {cellValues.row.title}
                </a>,
        },
        {
            field: 'type',
            headerName: 'Категория',
            minWidth: 350,
            flex: 1,
            renderCell: (cellValues) => typesNames[cellValues.row.type]
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
        }
    ];

    get columns() {
        return this.baseColumns
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
