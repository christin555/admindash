import axios from 'axios';

const API_URL = `http://localhost:8800/admin/`;
const baseQuery = axios.create({
  baseURL: API_URL,
  responseType: 'json',
 // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    authorization: `Bearer ${localStorage.token}`
  }
});

const API = {
  post: (address, body) => baseQuery.post(address, body).then(({data}) => data),
  get: (address) => baseQuery.get(address).then(({data}) => data)
};

export default API;
