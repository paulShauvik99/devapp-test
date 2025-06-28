import type { User } from './User';
import type { Comment } from './Comment';


export interface BlogWithUIState extends Blog {
  isLiked?: boolean // Current user's like status
}

export interface CommentWithUIState extends Comment {
  // Any UI-specific comment properties can be added here
}

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

export interface BlogsState {
  blogs: BlogWithUIState[]
  currentBlog: BlogWithUIState | null
  totalCount: number
  currentPage: number
  pageSize: number
  searchQuery: string
  selectedTags: string[]
  availableTags: string[]
  sortBy: 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'title'
  sortOrder: 'asc' | 'desc'
  isPublished?: boolean
  authorId?: string
  isLoading: boolean
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
  error: string | null
}