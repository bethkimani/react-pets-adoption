import axios from 'axios';

const API = axios.create({
    baseURL: 'https://pets-adoption-flask-sqlite.onrender.com/api', // Ensure this matches your Render URL
    withCredentials: true,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // Only set Content-Type to application/json if it's not a multipart/form-data request
    if (!config.headers['Content-Type'] || config.headers['Content-Type'] !== 'multipart/form-data') {
        config.headers['Content-Type'] = 'application/json';
    }
    console.log("Request config:", config); // Debug log to inspect the request
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
            window.location.href = '/';
            return Promise.reject(error);
        }
        if (error.message === 'Network Error') {
            console.error('Network Error: Unable to reach the server. Check your network or server status.');
        }
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// API functions
export const getPets = () => API.get('/pets/');
export const getTotalPets = () => API.get('/pets/total');
export const getTotalAdoptedPets = () => API.get('/pets/adopted/total');
export const addPet = (formData) =>
    API.post('/pets/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const updatePet = (id, formData) =>
    API.put(`/pets/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const deletePet = (id) =>
    API.delete(`/pets/${id}`, {
        validateStatus: (status) => {
            return (status >= 200 && status < 300) || status === 204; // Explicitly accept 204 as success
        },
    });
export const sendMessage = (messageData) => API.post('/messages/send', messageData);
export const getMessages = () => API.get('/messages/');
export const replyToMessage = (messageId, replyData) => API.post(`/messages/reply/${messageId}`, replyData);
export const likeMessage = (messageId) => API.post(`/messages/like/${messageId}`);
export const userLikeMessage = (messageId) => API.post(`/messages/user/like/${messageId}`);
export const userReplyToMessage = (messageId, replyData) => API.post(`/messages/user/reply/${messageId}`, replyData);
export const getUserMessages = (email) => API.get(`/messages/user/${email}`);
export const login = (data) => API.post('/auth/login', data);
export const getUsers = () => API.get('/users');
export const getTotalUsers = () => API.get(`/users/total`);
export const getRoles = () => API.get('/roles');
export const signup = (data) => API.post('/auth/signup', data);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const submitAdoptionForm = (formData) => API.post('/adoptions/', formData);
export const getAdoptions = () =>
    API.get('/adoptions/', {
        validateStatus: (status) => {
            return (status >= 200 && status < 300) || status === 404; // Accept 404 as a non-error case
        },
    });
export const updateAdoptionStatus = (id, data) => API.put(`/adoptions/${id}`, data);
export const deleteAdoption = (id) =>
    API.delete(`/adoptions/${id}`, {
        validateStatus: (status) => {
            return (status >= 200 && status < 300) || status === 404; // Accept 404 as a non-error case
        },
    });
export const addPaymentMethod = (data) => API.post('/payments/', data);
export const getPaymentsByUser = (userId) => API.get(`/payments/user/${userId}`);
export const schedulePickup = (data) => API.post('/schedule-pickup/', data);
export const getSchedulePickupsByUser = (userId) => API.get(`/schedule-pickup/user/${userId}`);
export const getChatMessages = () => API.get('/chat/messages'); // Updated to fetch from /chat/messages
export const resetPassword = (data) => API.post('/auth/reset-password', data);
export const resetPasswordConfirm = (data) =>
    API.post(`/auth/reset-password/${data.token}`, { password: data.password });

// New function to fetch dashboard summary
export const getDashboardSummary = () => API.get('/pets/dashboard/summary');

export default API;