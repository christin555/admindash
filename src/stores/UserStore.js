import {action, autorun, makeObservable, toJS, observable} from 'mobx';
import API from "./../utils/API";

class UserStore {
    user = {};
    isCheckedPass = true;
    id='';
    photoPath = '';
    firstName= '';
    secondName= '';
    lastName= '';
    country= '';
    about= '';
    email='';

    oldPassword='';
    newPassword='';
    repeatPassword='';


    constructor() {

        makeObservable(this, {
            id: observable,
            user: observable,
            photoPath: observable,
            firstName: observable,
            secondName: observable,
            lastName: observable,
            country: observable,
            about: observable,
            email: observable,

            oldPassword: observable,
            newPassword: observable,
            repeatPassword: observable,

            isCheckedPass: observable,

            setField: action.bound,
            checkPass: action.bound,
            editUser: action.bound,
            setFields: action.bound
        })
    }


    setUserField(field, value){
        this.user[field] = value;
    }

    setField(field, value){
        this[field] = value;
    }

    setFields(data){
        Object.entries(data).map(([key, value]) => {
            this[key] = value;
            }
        )
    }

    checkPass(){
        if(this.newPassword === this.repeatPassword) this.isCheckedPass = true;
        else this.isCheckedPass = false;
    }
}


export default UserStore;
