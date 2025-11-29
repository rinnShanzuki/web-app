import authService from './authService';
import api from './api';

// Types
interface RegisterClientData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    contact_no?: string;
    address?: string;
    gender?: string;
    birthdate?: string;
}

interface ClientUser {
    id: number;
    name: string;
    email: string;
    contact_no?: string;
    address?: string;
    gender?: string;
    birthdate?: string;
    status: string;
}

interface ClientAuthResponse {
    status: string;
    message: string;
    data: {
        client: ClientUser;
        token: string;
        token_type: string;
    };
}

class ClientAuthService {
    /**
     * Register a new client
     */
    async register(data: RegisterClientData): Promise<ClientAuthResponse> {
        try {
            const response = await api.post<ClientAuthResponse>('/client/auth/register', data);

            // Store token and client data using the same storage keys as authService
            if (response.data.data.token) {
                await authService.storeToken(response.data.data.token);
                await authService.storeUser(response.data.data.client);
            }

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error;
        }
    }
    
    /**
     * Login client
     */
    async login(email: string, password: string): Promise<ClientAuthResponse> {
        try {
            const response = await api.post<ClientAuthResponse>('/client/auth/login', { email, password });

            // Store token and client data
            if (response.data.data.token) {
                await authService.storeToken(response.data.data.token);
                await authService.storeUser(response.data.data.client);
            }

            return response.data;
        } catch (error: any) {
            throw error.response?.data || error;
        }
    }

    /**
     * Logout client
     */
    async logout(): Promise<void> {
        return authService.logout();
    }

    /**
     * Get current client
     */
    async getCurrentClient(): Promise<ClientUser | null> {
        try {
            const response = await api.get<ClientAuthResponse>('/client/auth/me');

            // Update stored client data
            await authService.storeUser(response.data.data.client);

            return response.data.data.client;
        } catch (error) {
            console.error('Get current client error:', error);
            return null;
        }
    }
}

export default new ClientAuthService();
