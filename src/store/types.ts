import type { store } from './index';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Common async thunk states
export interface AsyncThunkState {
    isLoading: boolean;
    error: string | null;
}

// Filter states for different entities
export interface BaseFilterState {
    search?: string;
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}

// Pagination state interface
export interface PaginationState {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
}

// API loading states
export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

// Generic API response wrapper
export interface ApiState<T> {
    data: T | null;
    status: LoadingState;
    error: string | null;
}

// Search state interface
export interface SearchState {
    query: string;
    results: {
        blogs: any[];
        developers: any[];
        skills: any[];
    };
    isSearching: boolean;
    hasSearched: boolean;
}

// Upload state interface
export interface UploadState {
    isUploading: boolean;
    uploadProgress: number;
    uploadedFiles: Array<{
        id: string;
        name: string;
        url: string;
        type: string;
        size: number;
    }>;
    error: string | null;
}

// Notification state interface
export interface NotificationState {
    notifications: Array<{
        id: string;
        type: 'info' | 'success' | 'warning' | 'error';
        title: string;
        message: string;
        isRead: boolean;
        createdAt: Date;
        actions?: Array<{
            label: string;
            action: string;
        }>;
    }>;
    unreadCount: number;
    isLoading: boolean;
}

// Modal state interface
export interface ModalState {
    activeModal: string | null;
    modalData: any;
    isOpen: boolean;
}

// Form state interface
export interface FormState<T = any> {
    data: T;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    isSubmitting: boolean;
    isValid: boolean;
}

// Cache state interface
export interface CacheState {
    lastUpdated: Record<string, number>;
    ttl: number; // Time to live in milliseconds
}

// Feature flags interface
export interface FeatureFlags {
    enableComments: boolean;
    enableNotifications: boolean;
    enableDarkMode: boolean;
    enableSocialLogin: boolean;
    enableFileUpload: boolean;
    enableSearch: boolean;
}

// App state interface (global app state)
export interface AppState {
    isInitialized: boolean;
    isOnline: boolean;
    version: string;
    featureFlags: FeatureFlags;
    lastActivity: Date | null;
}