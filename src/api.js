import axios from 'axios';

const API = axios.create({
    baseURL: 'https://pets-adoption-flask-sqlite.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
export const getPets = () => API.get('/pets');

export default API;