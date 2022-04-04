import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import {Typography} from "@material-ui/core";
import Box from "@mui/material/Box";
import Select from "../../../shared/Select";
import Field from "../../addProduct/Field";
import {toJS} from "mobx";

@inject(({DrawerStore}) => {
    return {
        product: toJS(DrawerStore.product),
        setValue: DrawerStore.setValue,
        fields: DrawerStore.fields || [],
        categories: DrawerStore.categories,
        category: DrawerStore.category,
        setCategory: DrawerStore.setCategory
    };
})
class DrawerStore extends React.Component {
    close = () => this.props.setDrawerShow(false);

    render() {
        const {
            fields,
            categories,
            setCategory,
            category,
            product,
            setValue,
        } = this.props;

        return (
            <div className={s.fields}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                >
                    <Typography
                        variant={'button'}
                        style={{marginBottom: '10px', color: '#454545', fontWeight: '400', display: 'flex'}}>
                        Категория
                        <Box marginLeft={'10px'} color={'red'}> * </Box>
                    </Typography>
                    <Select
                        options={categories}
                        value={category}
                        onChange={setCategory}
                    />
                </Box>

                {
                    fields.map((field) =>
                        <Field
                            {...field}
                            key={field.name}
                            setValue={setValue}
                            product={product}
                        />)}
            </div>

        );
    }
}

export default DrawerStore;
