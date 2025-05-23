import {observable, action, computed, set, reaction, toJS, makeObservable} from 'mobx';

import api from '../api';
import {alert} from './Notifications';
import {posts} from '../enums';
import DrawerStoreBase from './DrawerStoreBase';
import translitRuEn from '../utils/transliter';

class DrawerStorePost extends DrawerStoreBase {
    @observable mediaUpdated = false;

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
          {value: posts.PRODUCT, label: 'Салон (Каталог - товар)'},
          {value: posts.REVIEWS, label: 'Отзывы'},
          {value: posts.OTHER, label: 'Другое'}
        ],
        isRequired: true
      },

      {
        name: 'articleType', type: 'select', title: 'Тип медиа',
        values: [
          {value: 'short', label: 'Рилс'},
          {value: 'carousel', label: 'Карусель'},
          {value: 'video', label: 'Видео'}
        ]
      },
      {name: 'imgPreview', type: 'mediaDrop', title: 'Превью', isRequired: true}
    ]

    constructor(ListStore) {
      super(ListStore);

      makeObservable(this);
    }

    @computed get fields() {
      let mediaFields = [];
      const {articleType} = this.card;

      switch (articleType) {
        case 'img':
          mediaFields = [{name: 'media', type: 'mediaDrop', title: 'Фотография', isRequired: true}];
          break;
        case 'carousel':
          mediaFields = [{name: 'media', type: 'mediaDrop', title: 'Фотографии', isRequired: true, isMulti: true}];
          break;
        case 'short':
        case 'video':
          mediaFields = [
            {name: 'media', type: 'videoDropWithType', title: 'Видео', isRequired: true}
          ];
          break;
      }

      return {
        'main': this.baseFields,
        'media': mediaFields,
        'relations': [
          {
            search: this.searchRelation,
            name: 'relations',
            type: 'relations',
            title: 'Связи'
          }
        ]
      };
    }

    get preparedObject() {
      const mainFields = [
        'title',
        'media',
        'relations',
        'content',
        'type',
        'isPopular',
        'imgPreview',
        'watchCount',
        'mediaPosition',
        'articleType',
        'place',
        'square'
      ];

      return Object.entries(this.card).reduce((res, [key, val]) => {
        const value = val?.value || val;

        if (mainFields.includes(key) && this.oldCard[key] !== value) {
          if (key === 'media') {
            if (this.mediaUpdated) {
              res[key] = val;
            }
          } else if (key === 'relations') {
            res[key] = val.map(({entity, entityId}) => {
              if (entity && entityId) {
                return {
                  entity: entity?.value || entity,
                  entityId: entityId?.value || entityId
                };
              }

              return null;
            }).filter(Boolean);
          } else {
            res[key] = val;
          }
        }

        return res;
      }, {});
    }

  @action modifyCard = async() => {
    const copy = {...this.card};
    const relations = [];

    if (copy.relations) {
      for await (const item of copy.relations) {
        if (typeof item?.entityId === 'number') {
          const [option] = await this.searchRelation({type: item.entity, id: item.entityId});

          relations.push({
            ...item,
            entityId: option
          });
        }
      }
    }

    copy.relations = relations;

    this.card = copy;
  }

  get preparedNewObject() {
    const res = Object.entries(this.card).reduce((result, [key, val]) => {
      if (key === 'relations') {
        result[key] = val.map(({entity, entityId}) => {
          if (entity && entityId) {
            return {
              entity: entity?.value || entity,
              entityId: entityId?.value || entityId
            };
          }

          return null;
        }).filter(Boolean);
      } else if (Array.isArray(val)) {
        result[key] = val.map((item) => item?.value || item);
      } else {
        result[key] = val?.value || val;
      }

      return result;
    }, {});

    return res;
  }

  create = async() => {
    const {preparedNewObject: card} = this;

    try {
      await api.post('addPost', card);
      this.ListStore.afterRequestSuccess();
    } catch(err) {
      alert(`Ошибка создания: ${err}`);
    }
  };

    edit = async(data) => {
      try {
        await api.post('editPosts', data);
        this.ListStore.afterRequestSuccess();
      } catch(err) {
        alert({type: 'error', title: 'Ошибка'});
      }
    }

    loadFiled = (files, isMulti) => {
      if (isMulti) {
        return Promise.all(files.map(this.upload));
      }

      return this.upload(files[0]);
    }

   searchRelation = async({type, fastfilter, id}) => {
     try {
       const res = await api.post('searchRelation', {type, id, fastfilter});

       return res;
     } catch(err) {
       alert(`Ошибка: ${err}`);
     }
   }

    upload = async(file) => {
      const data = new FormData();

      data.append('file', file);
      data.append('alias', translitRuEn(this.card.title) || 'article');
      data.append('dir', 'posts');

      try {
        return await api.post('upload', data);
      } catch(e) {
        console.log(e);

        return null;
      }
    }

}

export default DrawerStorePost;
