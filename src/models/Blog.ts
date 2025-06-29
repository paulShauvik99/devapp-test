import type { Comment } from './Comment';


export interface Blog {
    id: string;
    title: string;
    content: string;
    authorId: string;
    excerpt: string;
    tags: string[];
    isPublished: boolean;
    comments: Comment[];
    commentCount: number;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
}

export interface CreateBlogInput {
    title: string;
    content: string;
    tags?: string[];
    isPublished?: boolean;
}

export interface UpdateBlogInput {
    title?: string;
    content?: string;
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
    sortBy?: 'createdAt' | 'updatedAt' | 'likes' | 'title';
    sortOrder?: 'asc' | 'desc';
}

export interface BlogStats {
    totalBlogs: number;
    publishedBlogs: number;
    totalLikes: number;
    totalComments: number;
}