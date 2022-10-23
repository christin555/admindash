import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import Field from "../../addProduct/Field";
import {toJS} from "mobx";

@inject(({DrawerStore}) => {
    return {
        card: toJS(DrawerStore.card),
        setValue: DrawerStore.setValue,
        fields: DrawerStore.fields || {}
    };
})
class DrawerStore extends React.Component {
    close = () => this.props.setDrawerShow(false);

    render() {
        const {
            fields,
            card,
            setValue
        } = this.props;

        return (
            <div className={s.fields}>
                    {
                        Object.entries(fields).map(([key, values]) => {
                            return  <>
                            <div className={s.nameGroup}> {groupNames[key] || key}  </div>
                                <div className={s.row}> {
                                    values.map(field => {
                                        return <Field   {...field}
                                                    key={field.name}
                                                    setValue={setValue}
                                                    product={card}
                                    />

                                })}
                                </div>
                          </>
                        })
                    }
            </div>
        );
    }
}

const groupNames = {
    [undefined]: 'Дополнительно',
    'main': 'Основное',
    'price': 'Цена'
}

export default DrawerStore;
