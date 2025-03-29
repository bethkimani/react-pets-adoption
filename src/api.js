import axios from 'axios';

// Create an Axios instance with the base URL and credentials
const API = axios.create({
    baseURL: 'https://pets-adoption-flask-sqlite.onrender.com/api',
    withCredentials: true,
});

// Add a request interceptor to include the authorization token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add a response interceptor to handle errors and unauthorized responses
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn('Unauthorized: Token may be invalid or expired');
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user_id');
            localStorage.removeItem('isAuthenticated');
            window.location.href = '/auth'; // Redirect to the login page
            return Promise.reject(error);
        }
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Existing API functions for user management
export const login = (data) => API.post('/auth/login', data);
export const getUsers = () => API.get('/users');
export const getRoles = () => API.get('/roles');
export const signup = (data) => API.post('/auth/signup', data);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// API functions for pet management
export const addPet = (formData) => 
    API.post('/pets/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Set content type for form data
        },
    });

export const getPets = () => API.get('/pets/');

// New functions for adoption management
export const submitAdoptionForm = (formData) => API.post('/adoptions/', formData);
export const getAdoptions = () => API.get('/adoptions/');

export default API;