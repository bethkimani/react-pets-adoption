import axios from 'axios';

const API = axios.create({
    baseURL: 'https://pets-adoption-flask-sqlite.onrender.com/api', // Ensure this matches your deployment
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add authorization token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor to handle errors
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

// User management API calls
export const getUsers = () => API.get('/users'); // Assuming this is the correct endpoint
export const getRoles = () => API.get('/roles'); // Assuming this is the correct endpoint
export const signup = (data) => API.post('/users', data); // Assuming this is the correct endpoint for signing up
export const updateUser = (id, data) => API.put(`/users/${id}`, data); // Assuming this is the correct endpoint for updating
export const deleteUser = (id) => API.delete(`/users/${id}`); // Assuming this is the correct endpoint for deleting

// Export API instance
export default API;