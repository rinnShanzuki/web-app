import axios from 'axios';
import API_CONFIG from '../config/api.config';

// Create axios instance
const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS,
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Handle specific error codes
            switch (error.response.status) {
                case 401:
                    // Unauthorized - Clear token and redirect to login
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('user_data');
                    window.location.href = '/login';
                    break;

                case 403:
                    console.error('Forbidden - Access denied');
                    break;

                case 404:
                    console.error('Resource not found');
                    break;

                case 422:
                    // Validation error - handled by the calling function
                    break;

                case 500:
                    console.error('Server error - Please try again later');
                    break;

                default:
                    console.error('An error occurred:', error.response.status);
            }
        } else if (error.request) {
            // Network error
            console.error('Network error - Please check your connection');
        } else {
            console.error('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
