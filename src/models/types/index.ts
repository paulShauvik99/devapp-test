export interface PaginationParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface SearchParams {
    query: string;
    filters?: Record<string, any>;
    pagination?: PaginationParams;
}

export interface AppTheme {
    mode: 'light' | 'dark';
    primaryColor: string;
    secondaryColor: string;
}

export interface AppSettings {
    theme: AppTheme;
    notifications: {
        email: boolean;
        push: boolean;
        comments: boolean;
        likes: boolean;
        follows: boolean;
    };
    privacy: {
        profileVisible: boolean;
        emailVisible: boolean;
        skillsVisible: boolean;
    };
}