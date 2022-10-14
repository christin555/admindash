import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import Field from "../../addProduct/Field";
import {toJS} from "mobx";

@inject(({DrawerStore}) => {
    return {
        card: toJS(DrawerStore.card),
        setValue: DrawerStore.setValue,
        fields: DrawerStore.fields || []
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
                <div>
                    {fields.slice(0, fields.length / 2).map((field) =>
                        <Field
                            {...field}
                            key={field.name}
                            setValue={setValue}
                            product={card}
                        />)}
                </div>
                <div>
                    {
                        fields.slice(fields.length / 2).map((field) =>
                            <Field
                                {...field}
                                key={field.name}
                                setValue={setValue}
                                product={card}
                            />)}
                </div>
            </div>
        );
    }
}

export default DrawerStore;
