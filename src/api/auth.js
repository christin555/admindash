import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.master-pola.com/auth/',
  responseType: 'json'
});
