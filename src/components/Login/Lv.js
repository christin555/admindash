import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './Login.module.scss';
import {inject, observer} from 'mobx-react';
import {NavLink, Redirect} from "react-router-dom";

@inject(({AuthStore}) => ({
        login: AuthStore.login,
        password: AuthStore.password,
        email: AuthStore.email,
        setField: AuthStore.setField,
        loginSuccess: AuthStore.loginSuccess,
    })
)
@observer
class Login extends React.Component {
    render() {

        const {
            login,
            email,
            password,
            setField,
            loginSuccess
        } = this.props;

        if (loginSuccess) return (<Redirect to="/"/>);

        const fields = [
            {label: 'Логин', onchange: event => setField('email', event.target.value), value: email},
            {
                label: 'Пароль',
                type: 'password',
                onchange: event => setField('password', event.target.value),
                value: password
            }
        ].map((el) => (
            <div className={styles.field}>
                <div>{el.label}</div>
                <div>
                    <TextField
                        value={el.value}
                        onChange={el.onchange}
                        type={el.type}
                    />
                </div>
            </div>
        ));

        return (
            <div className={styles.content}>
                {fields}
                <div className={styles.buttons}>
                    <Button onClick={login} variant="contained" color="primary">Вход</Button>
                </div>
            </div>
        );
    };
}

export default Login;
