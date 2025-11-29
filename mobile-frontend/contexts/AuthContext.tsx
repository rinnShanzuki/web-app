import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import authService from '../services/authService';

// Types
interface User {
    id: number;
    name: string;
    email: string;
    contact_number?: string;
    address?: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    isAuthenticated: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Load user on mount
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            setLoading(true);
            const isAuth = await authService.isAuthenticated();

            if (isAuth) {
                const storedUser = await authService.getStoredUser();
                setUser(storedUser);
            }
        } catch (error) {
            console.error('Load user error:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await authService.login({ email, password });
            setUser(response.data.user);
        } catch (error: any) {
            throw error;
        }
    };

    const register = async (data: any) => {
        try {
            const response = await authService.register(data);
            setUser(response.data.user);
        } catch (error: any) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const refreshUser = async () => {
        try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            console.error('Refresh user error:', error);
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to use auth context
export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
