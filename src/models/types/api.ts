import type { User, UserProfile } from '../User';
import type { Blog, BlogStats } from '../Blog';
import type { Comment } from '../Comment';
import type { Skill, UserSkill } from '../Skill';
import type { SocialLink } from '../SocialLink';
import type { AuthUser, AuthResponse } from '../Auth';

// Base API Response (matching MSW format)
export interface ApiResponse<T = any> {
    success: boolean;
    successMessage?: string;
    failureMessage?: string;
    data?: T;
    errors?: ValidationError[];
}

export interface PaginatedResponse<T = any> {
    success: boolean;
    successMessage?: string;
    failureMessage?: string;
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

export interface ValidationError {
    field: string;
    message: string;
    code?: string;
}

// Auth API Responses
export interface LoginResponse extends ApiResponse<AuthResponse> {}
export interface RegisterResponse extends ApiResponse<AuthResponse> {}
export interface LogoutResponse extends ApiResponse<null> {}

// User API Responses
export interface UserListResponse extends PaginatedResponse<UserProfile> {}
export interface UserDetailResponse extends ApiResponse<UserProfile> {}
export interface UserCreateResponse extends ApiResponse<User> {}
export interface UserUpdateResponse extends ApiResponse<User> {}
export interface UserDeleteResponse extends ApiResponse<null> {}

// Blog API Responses
export interface BlogListResponse extends PaginatedResponse<Blog> {}
export interface BlogDetailResponse extends ApiResponse<Blog> {}
export interface BlogCreateResponse extends ApiResponse<Blog> {}
export interface BlogUpdateResponse extends ApiResponse<Blog> {}
export interface BlogDeleteResponse extends ApiResponse<null> {}
export interface BlogStatsResponse extends ApiResponse<BlogStats> {}

// Comment API Responses
export interface CommentListResponse extends PaginatedResponse<Comment> {}
export interface CommentDetailResponse extends ApiResponse<Comment> {}
export interface CommentCreateResponse extends ApiResponse<Comment> {}
export interface CommentUpdateResponse extends ApiResponse<Comment> {}
export interface CommentDeleteResponse extends ApiResponse<null> {}

// Skill API Responses
export interface SkillListResponse extends ApiResponse<Skill[]> {}
export interface SkillCreateResponse extends ApiResponse<Skill> {}
export interface UserSkillListResponse extends ApiResponse<UserSkill[]> {}
export interface UserSkillCreateResponse extends ApiResponse<UserSkill> {}
export interface UserSkillDeleteResponse extends ApiResponse<null> {}

// Social Link API Responses
export interface SocialLinkListResponse extends ApiResponse<SocialLink[]> {}
export interface SocialLinkCreateResponse extends ApiResponse<SocialLink> {}
export interface SocialLinkUpdateResponse extends ApiResponse<SocialLink> {}
export interface SocialLinkDeleteResponse extends ApiResponse<null> {}

// Dashboard and Analytics
export interface DashboardStats {
    totalUsers: number;
    totalBlogs: number;
    totalComments: number;
    totalSkills: number;
    recentActivity: ActivityItem[];
}

export interface ActivityItem {
    id: string;
    type: 'blog_created' | 'comment_added' | 'user_joined' | 'skill_added';
    message: string;
    userId: string;
    user: Pick<User, 'id' | 'name' | 'avatar' | 'username'>;
    createdAt: Date;
    metadata?: Record<string, any>;
}

export interface DashboardResponse extends ApiResponse<DashboardStats> {}

// Search and Filter Types
export interface SearchResponse<T> extends PaginatedResponse<T> {
    query?: string;
    filters?: Record<string, any>;
}

// Error Response Types
export interface ErrorResponse extends ApiResponse<null> {
    success: false;
    failureMessage: string;
    errors?: ValidationError[];
}