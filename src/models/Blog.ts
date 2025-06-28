import type { User } from './User';
import type { Comment } from './Comment';


export interface Blog {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    coverImage?: string;
    authorId: string;
    author: User;
    tags: string[];
    isPublished: boolean;
    isDraft: boolean;
    comments: Comment[];
    commentCount: number;
    readTime: number; // in minutes
    views: number;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
}

export interface CreateBlogInput {
    title: string;
    content: string;
    excerpt?: string;
    coverImage?: string;
    tags?: string[];
    isPublished?: boolean;
}

export interface UpdateBlogInput {
    title?: string;
    content?: string;
    excerpt?: string;
    coverImage?: string;
    tags?: string[];
    isPublished?: boolean;
}

export interface BlogSearchFilters {
    authorId?: string;
    tags?: string[];
    search?: string;
    isPublished?: boolean;
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'title';
    sortOrder?: 'asc' | 'desc';
}

export interface BlogStats {
    totalBlogs: number;
    publishedBlogs: number;
    draftBlogs: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
}