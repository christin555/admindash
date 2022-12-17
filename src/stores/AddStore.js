import api from 'api';
import ProductStore from './ProductStore';

class AddStore extends ProductStore {
    save = async() => {
      const {preparedNewObject: card} = this;

      try {
        const alias = await api.post('addObject', {product: card});

        alert(`Успешно, ссылка: https://master-pola.com/product/${alias}`);
        this.RouterStore.history.push('/');

      } catch(err) {
        alert(`Ошибка: ${err}`);
      }
    };

}

export default AddStore;
