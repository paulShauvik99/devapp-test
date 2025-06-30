export interface Comment {
    id: string;
    content: string;
    blogId: string;
    authorName: string;
    parentId?: string; 
    replies?: Comment[];
    replyCount: number;
    likes: number;
    createdAt: Date;
}

export interface CreateCommentInput {
    content: string;
    blogId: string;
    parentId?: string;
}


export interface CommentWithReplies extends Comment {
    replies: Comment[];
    hasMoreReplies: boolean;
}