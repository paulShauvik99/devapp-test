export interface PaginationParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        hasNext: boolean;
        hasPrev: boolean;
        limit: number;
    };
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: ValidationError[];
}

export interface ValidationError {
    field: string;
    message: string;
    code?: string;
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