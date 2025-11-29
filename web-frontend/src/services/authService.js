import api from './api';

// Storage keys
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

class AuthService {
    /**
     * Login admin user
     */
    async login(email, password) {
        try {
            const response = await api.post('/auth/login', { email, password });

            // Store token and user data
            if (response.data.data.token) {
                localStorage.setItem(TOKEN_KEY, response.data.data.token);
                localStorage.setItem(USER_KEY, JSON.stringify(response.data.data.user));
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }

    /**
     * Register new user (if needed for admin)
     */
    async register(data) {
        try {
            const response = await api.post('/auth/register', data);

            // Store token and user data
            if (response.data.data.token) {
                localStorage.setItem(TOKEN_KEY, response.data.data.token);
                localStorage.setItem(USER_KEY, JSON.stringify(response.data.data.user));
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }

    /**
     * Logout user
     */
    async logout() {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            // Clear local storage regardless of API response
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
        }
    }

    /**
     * Get current authenticated user
     */
    async getCurrentUser() {
        try {
            const response = await api.get('/auth/me');

            // Update stored user data
            localStorage.setItem(USER_KEY, JSON.stringify(response.data.data.user));

            return response.data.data.user;
        } catch (error) {
            console.error('Get current user error:', error);
            return null;
        }
    }

    /**
     * Get stored user data
     */
    getStoredUser() {
        try {
            const userData = localStorage.getItem(USER_KEY);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Get stored user error:', error);
            return null;
        }
    }

    /**
     * Get stored token
     */
    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return !!this.getToken();
    }

    /**
     * Refresh token
     */
    async refreshToken() {
        try {
            const response = await api.post('/auth/refresh');

            if (response.data.data.token) {
                localStorage.setItem(TOKEN_KEY, response.data.data.token);
                return response.data.data.token;
            }

            return null;
        } catch (error) {
            console.error('Refresh token error:', error);
            return null;
        }
    }
}

export default new AuthService();
