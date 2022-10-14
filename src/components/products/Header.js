import React from 'react';
import {inject} from 'mobx-react';
import {toJS} from "mobx";
import Tabs, {tabsClasses} from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";


@inject(({ProductsStore}) => {
    return {
        categories: toJS(ProductsStore.categories) || [],
        setCategory: ProductsStore.setCategory,
        category: ProductsStore.category
    };
})
class Header extends React.Component {
    render() {
        const {
            categories,
            category,
            setCategory
        } = this.props;

        return <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs variant="scrollable"
                          sx={{
                              [`& .${tabsClasses.scrollButtons}`]: {
                                  '&.Mui-disabled': {opacity: 0.3},
                              },
                          }}
                          value={category} onChange={setCategory} aria-label="basic tabs example">
                        {
                            categories.map(({id, name}) => <Tab
                                key={id}
                                value={id}
                                label={name}
                            />)
                        }
                    </Tabs>
                </Box>
    }
}

export default Header;
