import type { User, UserProfile } from '../User';
import type { Blog, BlogStats } from '../Blog';
import type { Comment } from '../Comment';
import type { Skill, UserSkill } from '../Skill';
import type { PaginatedResponse, ApiResponse } from './index';
// User API responses
export interface UserListResponse extends PaginatedResponse<UserProfile> {}
export interface UserDetailResponse extends ApiResponse<UserProfile> {}

// Blog API responses
export interface BlogListResponse extends PaginatedResponse<Blog> {}
export interface BlogDetailResponse extends ApiResponse<Blog> {}
export interface BlogStatsResponse extends ApiResponse<BlogStats> {}

// Comment API responses
export interface CommentListResponse extends PaginatedResponse<Comment> {}
export interface CommentDetailResponse extends ApiResponse<Comment> {}

// Skill API responses
export interface SkillListResponse extends ApiResponse<Skill[]> {}
export interface UserSkillResponse extends ApiResponse<UserSkill[]> {}

// Dashboard data
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
