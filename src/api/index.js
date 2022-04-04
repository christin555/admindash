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

const verify = (err) => {
    if (err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.reload();
    }
}
const API = {
    post: (address, body) => baseQuery
        .post(address, body)
        .then(({data}) => data)
        .catch((err) => verify(err)),
    get: (address) => baseQuery
        .get(address)
        .then(({data}) => data)
        .catch((err) => verify(err)),
};

export default API;
