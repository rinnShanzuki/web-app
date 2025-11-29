import { useState, useEffect, createContext, useContext } from 'react';
import authService from '../services/authService';

// Create context
const AuthContext = createContext(undefined);

// Provider component
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user on mount
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = () => {
        try {
            setLoading(true);
            const isAuth = authService.isAuthenticated();

            if (isAuth) {
                const storedUser = authService.getStoredUser();
                setUser(storedUser);
            }
        } catch (error) {
            console.error('Load user error:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
            setUser(response.data.user);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const register = async (data) => {
        try {
            const response = await authService.register(data);
            setUser(response.data.user);
            return response;
        } catch (error) {
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

    const value = {
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
