import {observable, action, computed, set, reaction, toJS, makeObservable} from 'mobx';

import api from '../api';
import {alert} from './Notifications';
import {posts} from '../enums';
import DrawerStoreBase from './DrawerStoreBase';

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
          {value: posts.PRODUCT, label: 'Каталог - товар'},
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
      let mediaField = {};
      const {articleType} = this.card;

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

      return {
        'main': this.baseFields,
        'media': [mediaField],
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

        if (value && mainFields.includes(key) && this.oldCard[key] !== value) {
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

    loadFiled = async(files, isMulti) => {
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
      data.append('name', this.card.alias);

      try {
        return await api.post('upload', data);
      } catch(e) {
        console.log(e);

        return null;
      }
    }

}

export default DrawerStorePost;
