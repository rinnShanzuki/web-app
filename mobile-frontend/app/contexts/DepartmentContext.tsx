import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DepartmentCode, DepartmentConfig, DEPARTMENTS } from '../utils/departmentConfig';

interface DepartmentContextType {
    department: DepartmentConfig | null;
    setDepartment: (code: DepartmentCode) => Promise<void>;
    isLoading: boolean;
}

const DepartmentContext = createContext<DepartmentContextType | undefined>(undefined);

const DEPARTMENT_STORAGE_KEY = '@responder_department';

export function DepartmentProvider({ children }: { children: ReactNode }) {
    const [department, setDepartmentState] = useState<DepartmentConfig | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadDepartment();
    }, []);

    const loadDepartment = async () => {
        try {
            const storedCode = await AsyncStorage.getItem(DEPARTMENT_STORAGE_KEY);
            if (storedCode && storedCode in DEPARTMENTS) {
                setDepartmentState(DEPARTMENTS[storedCode as DepartmentCode]);
            }
        } catch (error) {
            console.error('Error loading department:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const setDepartment = async (code: DepartmentCode) => {
        try {
            await AsyncStorage.setItem(DEPARTMENT_STORAGE_KEY, code);
            setDepartmentState(DEPARTMENTS[code]);
        } catch (error) {
            console.error('Error saving department:', error);
            throw error;
        }
    };

    return (
        <DepartmentContext.Provider value={{ department, setDepartment, isLoading }}>
            {children}
        </DepartmentContext.Provider>
    );
}

export function useDepartment() {
    const context = useContext(DepartmentContext);
    if (context === undefined) {
        throw new Error('useDepartment must be used within a DepartmentProvider');
    }
    return context;
}
