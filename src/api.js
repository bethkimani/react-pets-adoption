// api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'https://pets-adoption-flask-sqlite.onrender.com/api', // Ensure this matches your deployment
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
        return Promise.reject(error);
    }
);

// Auth API calls
export const login = (data) => API.post('/auth/login', data);

// Export API instance
export default API;