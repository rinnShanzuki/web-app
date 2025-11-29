import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

// Types
interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    contact_number?: string;
    address?: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    contact_number?: string;
    address?: string;
    role: string;
}

interface AuthResponse {
    status: string;
    message: string;
    data: {
        user: User;
        token: string;
        token_type: string;
    };
}

// Storage keys
const TOKEN_KEY = '@auth_token';
const USER_KEY = '@user_data';

class AuthService {
    /**
     * Register a new user
     */
    async register(data: RegisterData): Promise<AuthResponse> {
        try {
            const response = await api.post<AuthResponse>('/auth/register', data);

            // Store token and user data
            if (response.data.data.token) {
                await AsyncStorage.setItem(TOKEN_KEY, response.data.data.token);
                await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.data.data.user));
            }

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error;
        }
    }

    /**
     * Login user
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await api.post<AuthResponse>('/auth/login', credentials);

            // Store token and user data
            if (response.data.data.token) {
                await AsyncStorage.setItem(TOKEN_KEY, response.data.data.token);
                await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.data.data.user));
            }

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error;
        }
    }

    /**
     * Logout user
     */
    async logout(): Promise<void> {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            // Clear local storage regardless of API response
            await AsyncStorage.removeItem(TOKEN_KEY);
            await AsyncStorage.removeItem(USER_KEY);
        }
    }

    /**
     * Get current authenticated user
     */
    async getCurrentUser(): Promise<User | null> {
        try {
            const response = await api.get<AuthResponse>('/auth/me');

            // Update stored user data
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.data.data.user));

            return response.data.data.user;
        } catch (error) {
            console.error('Get current user error:', error);
            return null;
        }
    }

    /**
     * Get stored user data
     */
    async getStoredUser(): Promise<User | null> {
        try {
            const userData = await AsyncStorage.getItem(USER_KEY);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Get stored user error:', error);
            return null;
        }
    }

    /**
     * Get stored token
     */
    async getToken(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(TOKEN_KEY);
        } catch (error) {
            console.error('Get token error:', error);
            return null;
        }
    }

    /**
     * Check if user is authenticated
     */
    async isAuthenticated(): Promise<boolean> {
        const token = await this.getToken();
        return !!token;
    }

    /**
     * Refresh token
     */
    async refreshToken(): Promise<string | null> {
        try {
            const response = await api.post<AuthResponse>('/auth/refresh');

            if (response.data.data.token) {
                await AsyncStorage.setItem(TOKEN_KEY, response.data.data.token);
                return response.data.data.token;
            }

            return null;
        } catch (error) {
            console.error('Refresh token error:', error);
            return null;
        }
    }

    /**
     * Helper: Store token
     */
    async storeToken(token: string): Promise<void> {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    }

    /**
     * Helper: Store user data
     */
    async storeUser(user: any): Promise<void> {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    }
}

export default new AuthService();
