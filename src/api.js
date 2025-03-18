import axios from 'axios';

const API = axios.create({
    baseURL: 'https://pets-adoption-flask-sqlite.onrender.com/api', // Matches your deployed backend
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

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user_id');
            localStorage.removeItem('isAuthenticated');
            window.location.href = '/login';
        }
        console.error('API Error:', error.response?.data || error.message); // Log error for debugging
        return Promise.reject(error);
    }
);

export const login = (data) => API.post('/auth/login', data);
export const getUsers = () => API.get('/users');
export const getRoles = () => API.get('/roles');
export const signup = (data) => API.post('/auth/signup', data); // Correct endpoint
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

export default API;