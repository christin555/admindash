import React from 'react';
import {inject} from 'mobx-react';
import Box from '@mui/material/Box';
import {CircularProgress, Tooltip, Typography} from '@mui/material';
import Button from "@mui/material/Button";

@inject(({ProductsStore}) => {
  return {
    activeCategory: ProductsStore.activeCategory,
    stats: ProductsStore.stats,
    toggleEdit: ProductsStore.toggleEdit,
    isEdit: ProductsStore.isEdit,
    reset: ProductsStore.reset,
    save: ProductsStore.save,
  };
})

class Header extends React.Component {
  render() {
    const {
      activeCategory,
      stats,
      reset,
      isEdit,
      toggleEdit,
      save,
    } = this.props;

    return (
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}
           display={'flex'} gap={'20px'} justifyContent={'space-between'}>
        <Box

          display={'flex'}
          alignItems={'center'}
          gap={'20px'}
          height={'60px'}>

          <Tooltip title={(
            <div>
              <Typography variant="subtitle2">
                {'Заполненность фильтра'}
              </Typography>
              {
                stats.percents?.map(({title, percent}) => (
                  <Typography key={title} component={'div'} variant={'body1'}>
                    {`${percent}%`} - {title}
                  </Typography>
                ))
              }
            </div>
          )}
          >
            <Box sx={{position: 'relative', display: 'inline-flex'}}>
              <CircularProgress
                color={stats.commonPercent === 100 ? 'success' : stats.commonPercent > 95 ? 'warning' : 'error'}
                variant='determinate'
                value={stats.commonPercent}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography
                  variant='caption'
                  component='div'
                  sx={{color: 'text.secondary'}}
                >{`${stats.commonPercent}%`}
                </Typography>
              </Box>
            </Box>
          </Tooltip>


          <Typography
            variant={'h6'}
            sx={{textTransform: 'uppercase'}}
          >
            {activeCategory.name}
          </Typography>
        </Box>


          <Box display={'flex'} gap={'20px'} alignItems={'center'}>


            {
              !isEdit && (
                <React.Fragment>
                  <Button variant={'contained'} onClick={toggleEdit}> Редактировать </Button>
                  <Button
                    variant={'contained'}
                    color={'secondary'}
                    onClick={() => this.props.openDrawerWithMode('add')}
                  > Добавить
                  </Button>
                </React.Fragment>
              ) ||
              (
                <React.Fragment>
                  <Button variant={'contained'} onClick={save}> Сохранить </Button>
                  <Button variant={'contained'} onClick={reset} color={'secondary'}> Отмена </Button>
                </React.Fragment>
              )
            }
          </Box>

      </Box>
  );
  }
  }

  export default Header;
