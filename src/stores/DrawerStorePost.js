import {observable, action, get, computed, set, reaction, toJS, makeObservable} from 'mobx';

import api from "../api";
import {alert} from "./Notifications";
import {status as statusEnum, posts} from "../enums";

class DrawerStorePost {
    @observable mode;
    @observable status = statusEnum.LOADING;
    @observable card = {};
    oldCard = {}

    baseFields = [
        {name: 'title', type: 'character varying', title: 'Название', isRequired: true},
        {name: 'isPopular', type: 'boolean', title: 'Популярное'},
        {name: 'content', type: 'text', title: 'Текст', isRequired: true},
        {name: 'watchCount', type: 'integer', title: 'Колво просмотров', isRequired: true},
        {name: 'place', type: 'character varying', title: 'Место'},
        {
            name: 'mediaPosition', type: 'select', title: 'Расположение медиа',
            values: [
                {value: 'vertical', label: 'Вертикально'},
                {value: 'horizontal', label: 'Горизонтально'}
                ],
            isRequired: true
        },
        {
            name: 'type', type: 'select', title: 'Категория',
            values: [
                {value: posts.WORKS, label: 'Работы'},
                {value: posts.PRODUCT, label: 'Каталог - товар'},
                {value: posts.OTHER, label: 'Другое'}],
            isRequired: true
        },

            {
                name: 'articleType', type: 'select', title: 'Тип медиа',
                values: [
                    {value: 'short', label: 'Рилс'},
                    {value: 'carousel', label: 'Карусель'},
                    {value: 'video', label: 'Видео'}
                ],
            },
            {name: 'imgPreview', type: 'mediaDrop', title: 'Превью', isRequired: true}
    ]

    constructor(ListStore) {
        this.ListStore = ListStore;

        reaction(
            () => this.ListStore.actionsData,
            this.setActions
        )

        makeObservable(this);
    }

    @computed get fields() {
        let mediaField = {};
        const articleType = this.card.articleType;

        console.log('get', articleType, this.card)
        switch (articleType) {
            case 'img':
                mediaField = {name: 'media', type: 'mediaDrop', title: 'Фотография', isRequired: true};
                break;
            case 'carousel':
                mediaField = {name: 'media', type: 'mediaDrop', title: 'Фотографии', isRequired: true, isMulti: true};
                break;
            case 'short':
            case 'video':
                mediaField = {name: 'media', type: 'mediaDrop', title: 'Видео', isRequired: true};
                break;
        }

        return {'main':this.baseFields, 'media': [mediaField]};
    }


    get selected() {
        return this.ListStore.selected;
    }

    get preparedObject() {
        const mainFields = ['title', 'media', 'content', 'type', 'isPopular', 'imgPreview', 'watchCount', 'mediaPosition', 'articleType', 'place', 'square'];

        return Object.entries(this.card).reduce((res, [key, val]) => {
            const value = val?.value || val;
               if (value && mainFields.includes(key) && this.oldCard[key] !== value) {
                   res[key] =val
               }
               return res;
            }, {}
        )
    }

    @action setActions = () => {
        this.mode = this.ListStore.actionsData.mode;

        if (this.mode === 'show' || this.mode === 'edit') {
            this.oldCard = toJS(this.ListStore.actionsData.values);
            this.card = toJS(this.ListStore.actionsData.values);
        }

        if (this.mode === 'copy') {
            this.card = toJS(this.ListStore.actionsData.values);
            delete this.card.id;
            delete this.card.name;
            delete this.card.imgs;
        }
    }

    @action reset = () => {
        this.card = {};
        this.oldCard = {}
        this.mode = null;
        this.ListStore.actionsData = {};
        this.ListStore.setDrawerShow(false);
    }

    failReq = () => Object.values(this.fields).flat().some(({isRequired, name}) => isRequired && !this.card[name])

    @action apply = () => {
        if (this.mode === 'edit') {
            console.log(this.failReq());

            if(this.failReq()){
                return
            }

            this.edit({ids: [this.card.id], data: this.preparedObject});
        }

        if (this.mode === 'massedit') {
            this.edit({ids: this.selected, data: this.preparedObject});
        }

        if (this.mode === 'add') {
            console.log(this.failReq());

            if(this.failReq()){
                return
            }

            this.create();
        }

        if (this.mode === 'copy' ) {
            this.create();
        }

        this.reset();
    }

    @action setValue = (name, value) => {
        console.log('setValue', name, value)
        if (name === 'articleType') {
            set(this.card, {media: null});
        }
        set(this.card, {[name]: value});
    };

    get preparedNewObject() {
        const res = Object.entries(this.card).reduce((res, [key, val]) => {
                res[key] = val?.value || val;
                return res;
            }, {}
        )

        return res;
    }

    create = async () => {
        const {preparedNewObject: card} = this;

        try {
            await api.post('addPost', card);
            this.ListStore.afterRequestSuccess()
        } catch (err) {
            alert(`Ошибка создания: ${err}`)
        }
    };

    edit = async (data) => {
        try {
            await api.post('editPosts', data);
            this.ListStore.afterRequestSuccess();
        } catch (err) {
            alert({type: 'error', title: 'Ошибка'});
        }
    }

    loadFiled = async (files, isMulti) => {
        if (isMulti) {
            return Promise.all(files.map(this.upload))
        } else return this.upload(files[0]);
    }

    upload = async (file) => {
        const data = new FormData();
        data.append('file', file);
        data.append('name', this.card.alias);

        try {
            return (await api.post('upload', data));
        } catch (e) {
            console.log(e);
            return null
        }
    }

}

export default DrawerStorePost;
