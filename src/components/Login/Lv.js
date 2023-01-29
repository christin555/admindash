import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './Login.module.scss';
import {inject, observer} from 'mobx-react';
import {NavLink, Redirect} from 'react-router-dom';

@inject(({AuthStore}) => {
  return {
    login: AuthStore.login,
    password: AuthStore.password,
    email: AuthStore.email,
    setField: AuthStore.setField,
    loginSuccess: AuthStore.loginSuccess
  };
})
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

    if (loginSuccess) {
      return (<Redirect to='/' />);
    }

    const fields = [
      {
        label: 'Логин',
        name: 'login',
        onchange: (event) => setField('email', event.target.value),
        value: email
      },
      {
        label: 'Пароль',
        name: 'password',
        type: 'password',
        onchange: (event) => setField('password', event.target.value),
        value: password
      }
    ].map((el) => (
      <div className={styles.field} key={el.name}>
        <div>{el.label}</div>
        <div>
          <TextField
            name={el.name}
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
          <Button onClick={login} variant='contained' color='primary'>Вход</Button>
        </div>
      </div>
    );
  }
}

export default Login;
