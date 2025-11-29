import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from '../config/api.config';

// Create axios instance
const api: AxiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS,
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        try {
            const token = await AsyncStorage.getItem('@auth_token');

            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        } catch (error) {
            console.error('Error reading token from storage:', error);
            return config;
        }
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        if (error.response) {
            // Handle specific error codes
            switch (error.response.status) {
                case 401:
                    // Unauthorized - Clear token and redirect to login
                    await AsyncStorage.removeItem('@auth_token');
                    await AsyncStorage.removeItem('@user_data');
                    // You can add navigation logic here if needed
                    console.log('Unauthorized - Token cleared');
                    break;

                case 403:
                    console.log('Forbidden - Access denied');
                    break;

                case 404:
                    console.log('Resource not found');
                    break;

                case 422:
                    // Validation error - handled by the calling function
                    break;

                case 500:
                    console.log('Server error - Please try again later');
                    break;

                default:
                    console.log('An error occurred:', error.response.status);
            }
        } else if (error.request) {
            // Network error
            console.log('Network error - Please check your connection');
        } else {
            console.log('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
