import type { User, UserProfile } from '../User';
import type { Blog, BlogStats } from '../Blog';
import type { Comment } from '../Comment';
import type { Skill } from '../Skill';
import type { SocialLink } from '../SocialLink';
import type { AuthResponse } from '../Auth';

export interface ApiResponse<T = any> {
    success: boolean;
    successMessage?: string;
    failureMessage?: string;
    data?: T;
    errors?: string;
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


// Auth API Responses
export interface LoginResponse extends ApiResponse<AuthResponse> {}
export interface RegisterResponse extends ApiResponse<AuthResponse> {}
export interface LogoutResponse extends ApiResponse<null> {}

// User API Responses
export interface UserListResponse extends PaginatedResponse<User> {}
export interface UserDetailResponse extends ApiResponse<UserProfile> {}
export interface UserCreateResponse extends ApiResponse<User> {}

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


// Skill API Responses
export interface SkillListResponse extends ApiResponse<Skill[]> {}
export interface SkillCreateResponse extends ApiResponse<Skill> {}

// Social Link API Responses
export interface SocialLinkListResponse extends ApiResponse<SocialLink[]> {}
export interface SocialLinkCreateResponse extends ApiResponse<SocialLink> {}
export interface SocialLinkUpdateResponse extends ApiResponse<SocialLink> {}
export interface SocialLinkDeleteResponse extends ApiResponse<null> {}

export interface ActivityItem {
    id: string;
    type: 'blog_created' | 'comment_added' | 'user_joined' | 'skill_added';
    message: string;
    userId: string;
    user: Pick<User, 'id' | 'name' | 'avatar'>;
    createdAt: Date;
}

export interface SearchResponse<T> extends PaginatedResponse<T> {
    query?: string;
    filters?: Record<string, any>;
}