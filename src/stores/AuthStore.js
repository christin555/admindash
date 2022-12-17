import {makeObservable, action, observable} from 'mobx';
import AUTH from './../api/auth';

class AuthStore {
    @observable loginSuccess = false;
    password = ''
    email = '';
    repeatPassword = '';

    constructor() {
      makeObservable(this, {
        password: observable,
        loginSuccess: observable,
        setField: action.bound,
        checkPass: action.bound,
        email: observable,
        repeatPassword: observable
      });
    }

    @action setLoginSuccess = (status) => this.loginSuccess = status;

    setField(field, value) {
      this[field] = value;
    }

    checkPass() {
      if (this.password === this.repeatPassword) {
        this.isCheckedPass = true;
      } else {
        this.isCheckedPass = false;
      }
    }

    login = async() => {
      await AUTH.post('login', {
        password: this.password,
        email: this.email
      }).then((res) => {
        localStorage.setItem('token', res.data.token);
        this.setLoginSuccess(true);
        window.location.reload();
      })
        .catch((err) => alert('Ошибка'));
    }
}

export default AuthStore;

