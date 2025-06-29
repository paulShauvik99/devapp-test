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