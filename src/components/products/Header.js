import React from 'react';
import {inject} from 'mobx-react';
import {toJS} from "mobx";
import Tabs, {tabsClasses} from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import s from './style.module.scss';

@inject(({ProductsStore}) => {
    return {
        categories: toJS(ProductsStore.categories) || [],
        setCategory: ProductsStore.setCategory,
        category: ProductsStore.category,
        toggleEdit: ProductsStore.toggleEdit,
        isEdit: ProductsStore.isEdit,
        reset: ProductsStore.reset,
        save: ProductsStore.save,
        fastFilterInput: ProductsStore.fastFilterInput,
        setFastFilter: ProductsStore.setFastFilter,
        setFastFilterInput: ProductsStore.setFastFilterInput,
        openDrawerWithMode: ProductsStore.openDrawerWithMode
    };
})
class PriceView extends React.Component {
    render() {
        const {
            categories,
            reset,
            isEdit,
            toggleEdit,
            category,
            setCategory,
            save,
            fastFilterInput,
            setFastFilterInput,
            setFastFilter
        } = this.props;

        return (
            <React.Fragment>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs variant="scrollable"
                          sx={{
                              [`& .${tabsClasses.scrollButtons}`]: {
                                  '&.Mui-disabled': {opacity: 0.3},
                              },
                          }}
                          value={category} onChange={setCategory} aria-label="basic tabs example">
                        {
                            categories.map(({id, name}) => <Tab
                                key={name}
                                value={id}
                                label={name}
                            />)
                        }
                    </Tabs>
                </Box>
                <Box className ={s.menu} margin={'20px 0'} display={'flex'} gap={'20px'} justifyContent={'space-between'}>
                    <Box width={'390px'} className={s.search}>
                        <TextField
                            onChange={({target: {value}}) => setFastFilterInput(value)}
                            onBlur={setFastFilter}
                            value={fastFilterInput || ''}
                            size={'small'}
                            fullWidth={true}
                            placeholder={'?????????? ???? ????????????????, ?????????????????? ?????? ????????????'}
                        />
                    </Box>
                    <Box display={'flex'} gap={'20px'}>
                        {
                            !isEdit && <>
                                <Button variant={'contained'} onClick={toggleEdit}> ?????????????????????????? </Button>
                                <Button variant={'contained'} color={'secondary'}
                                        onClick={() => this.props.openDrawerWithMode('add')}> ???????????????? </Button>
                            </>
                            || <>
                                <Button variant={'contained'} onClick={save} > ?????????????????? </Button>
                                <Button variant={'contained'} onClick={reset} color={'secondary'}> ???????????? </Button>
                            </>
                        }
                    </Box>
                </Box>
            </React.Fragment>
        );
    }
}

export default PriceView;
