export type DepartmentCode = 'MDRRMO' | 'PNP' | 'BFP' | 'RDH';

export interface DepartmentConfig {
    code: DepartmentCode;
    name: string;
    fullName: string;
    colors: {
        primary: string;
        secondary: string;
        gradient: string[];
    };
    icon: {
        filled: any;
        outline: any;
    };
}

export const DEPARTMENTS: Record<DepartmentCode, DepartmentConfig> = {
    MDRRMO: {
        code: 'MDRRMO',
        name: 'MDRRMO',
        fullName: 'Municipal Disaster Risk Reduction and Management Office',
        colors: {
            primary: '#D64219',
            secondary: '#920114',
            gradient: ['#D64219', '#920114', '#3F0008'],
        },
        icon: {
            filled: require('../../assets/images/mdrrmo-filled.png'),
            outline: require('../../assets/images/mdrrmo-outline.png'),
        },
    },
    PNP: {
        code: 'PNP',
        name: 'PNP',
        fullName: 'Philippine National Police',
        colors: {
            primary: '#1E3A8A',
            secondary: '#1E40AF',
            gradient: ['#3B82F6', '#1E40AF', '#1E3A8A'],
        },
        icon: {
            filled: require('../../assets/images/pnp-filled.png'),
            outline: require('../../assets/images/pnp-outline.png'),
        },
    },
    BFP: {
        code: 'BFP',
        name: 'BFP',
        fullName: 'Bureau of Fire Protection',
        colors: {
            primary: '#DC2626',
            secondary: '#991B1B',
            gradient: ['#EF4444', '#DC2626', '#991B1B'],
        },
        icon: {
            filled: require('../../assets/images/bfp-filled.png'),
            outline: require('../../assets/images/bfp-outline.png'),
        },
    },
    RDH: {
        code: 'RDH',
        name: 'RDH',
        fullName: 'Rural Health Unit',
        colors: {
            primary: '#059669',
            secondary: '#047857',
            gradient: ['#10B981', '#059669', '#047857'],
        },
        icon: {
            filled: require('../../assets/images/rdh-filled.png'),
            outline: require('../../assets/images/rdh-outline.png'),
        },
    },
};

export const DEPARTMENT_OPTIONS = Object.values(DEPARTMENTS).map(dept => ({
    label: `${dept.name} - ${dept.fullName}`,
    value: dept.code,
}));
