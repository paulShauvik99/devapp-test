import type { User } from './User';
import type { Blog } from './Blog';

export interface Comment {
    id: string;
    content: string;
    blogId: string;
    blog?: Blog;
    authorId: string;
    author: User;
    parentId?: string; // for nested comments
    replies?: Comment[];
    replyCount: number;
    likes: number;
    isEdited: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateCommentInput {
    content: string;
    blogId: string;
    parentId?: string;
}

export interface UpdateCommentInput {
    content: string;
}

export interface CommentWithReplies extends Comment {
    replies: Comment[];
    hasMoreReplies: boolean;
}