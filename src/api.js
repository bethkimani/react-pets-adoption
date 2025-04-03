// src/api.js
import axios from 'axios';

// Use the Render URL for the API base
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://pets-adoption-flask-sqlite.onrender.com/api',
    withCredentials: true,
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
            console.warn('Unauthorized: Token may be invalid or expired');
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user_id');
            localStorage.removeItem('isAuthenticated');
            window.location.href = '/login'; // Redirect to login instead of /auth
            return Promise.reject(error);
        }
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// API functions
export const getPets = () => API.get('/pets/');
export const addPet = (formData) =>
    API.post('/pets/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const updatePet = (id, formData) =>
    API.put(`/pets/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const deletePet = (id) => API.delete(`/pets/${id}`);
export const sendMessage = (messageData) =>
    API.post('/messages/send', messageData);
export const getMessages = () => API.get('/messages/');
export const login = (data) => API.post('/auth/login', data); // Removed user_type
export const getUsers = () => API.get('/users');
export const getRoles = () => API.get('/roles');
export const signup = (data) => API.post('/auth/signup', data);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const submitAdoptionForm = (formData) => API.post('/adoptions/', formData);
export const getAdoptions = () => API.get('/adoptions/');
export const addPaymentMethod = (data) => API.post('/payments/', data);
export const schedulePickup = (data) => API.post('/schedule-pickup/', data);
export const getChatMessages = () => API.get('/messages/');
export const resetPassword = (data) => API.post('/auth/reset-password', data);

export default API;