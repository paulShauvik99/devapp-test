import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';
import type { 
    Comment, 
    CreateCommentInput, 
    UpdateCommentInput,
    CommentWithReplies 
} from '../../models/Comment';
import type { PaginatedResponse } from '../../models';
import type { DashboardStats, ActivityItem } from '../../models';

// Base query with auth token
const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
        headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

// Base query with re-auth
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    
    if (result.error && result.error.status === 401) {
        // Try to refresh token
        const refreshResult = await baseQuery(
        {
            url: '/auth/refresh',
            method: 'POST',
            body: {
            refreshToken: (api.getState() as RootState).auth.refreshToken,
            },
        },
        api,
        extraOptions
        );
        
        if (refreshResult.data) {
            // Store new token and retry original request
            api.dispatch({ type: 'auth/setCredentials', payload: refreshResult.data });
            result = await baseQuery(args, api, extraOptions);
        } else {
            // Refresh failed, logout user
            api.dispatch({ type: 'auth/logout' });
        }
    }
    
    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Blog', 'Comment', 'User', 'Skill', 'SocialLink', 'Dashboard'],
    endpoints: (builder) => ({
    // Comment endpoints
    getComments: builder.query<PaginatedResponse<Comment>, { blogId: string; page?: number; limit?: number }>({
        query: ({ blogId, page = 1, limit = 10 }) => 
            `/blogs/${blogId}/comments?page=${page}&limit=${limit}`,
        providesTags: (result, error, { blogId }) => [
            { type: 'Comment', id: 'LIST' },
            { type: 'Comment', id: blogId },
        ],
    }),
    
    getCommentReplies: builder.query<CommentWithReplies[], string>({
        query: (commentId) => `/comments/${commentId}/replies`,
        providesTags: (result, error, commentId) => [
            { type: 'Comment', id: commentId },
        ],
    }),
    
    createComment: builder.mutation<Comment, CreateCommentInput>({
        query: (newComment) => ({
            url: '/comments',
            method: 'POST',
            body: newComment,
        }),
        invalidatesTags: (result, error, { blogId }) => [
            { type: 'Comment', id: 'LIST' },
            { type: 'Comment', id: blogId },
            { type: 'Blog', id: blogId },
        ],
    }),
    
    updateComment: builder.mutation<Comment, { id: string; data: UpdateCommentInput }>({
        query: ({ id, data }) => ({
            url: `/comments/${id}`,
            method: 'PUT',
            body: data,
        }),
        invalidatesTags: (result, error, { id }) => [
            { type: 'Comment', id },
        ],
    }),
    
    deleteComment: builder.mutation<void, string>({
        query: (commentId) => ({
            url: `/comments/${commentId}`,
            method: 'DELETE',
        }),
        invalidatesTags: (result, error, commentId) => [
            { type: 'Comment', id: commentId },
            { type: 'Comment', id: 'LIST' },
        ],
    }),
    
    likeComment: builder.mutation<{ commentId: string; likes: number }, string>({
        query: (commentId) => ({
            url: `/comments/${commentId}/like`,
            method: 'POST',
        }),
        async onQueryStarted(commentId, { dispatch, queryFulfilled }) {
            try {
            const { data } = await queryFulfilled;
            // Optimistically update comment likes in cache
            dispatch(
                apiSlice.util.updateQueryData('getComments', { blogId: '' }, (draft) => {
                const comment = draft.data.find((c: Comment) => c.id === commentId);
                if (comment) {
                    comment.likes = data.likes;
                }
                })
            );
            } catch {
            // Handle error
            }
        },
    }),
    
    // Dashboard endpoints
    getDashboardStats: builder.query<DashboardStats, void>({
        query: () => '/dashboard/stats',
        providesTags: ['Dashboard'],
    }),
    
    getRecentActivity: builder.query<ActivityItem[], { limit?: number }>({
        query: ({ limit = 10 }) => `/dashboard/activity?limit=${limit}`,
        providesTags: ['Dashboard'],
    }),
    
    // Search endpoints
    searchAll: builder.query<{
        blogs: any[];
        developers: any[];
        skills: any[];
    }, string>({
        query: (searchTerm) => `/search?q=${encodeURIComponent(searchTerm)}`,
    }),
    
    // File upload endpoint
    uploadFile: builder.mutation<{ url: string; filename: string }, FormData>({
        query: (formData) => ({
            url: '/upload',
            method: 'POST',
            body: formData,
        }),
    }),
    
    // Notification endpoints
    getNotifications: builder.query<any[], { page?: number; limit?: number }>({
        query: ({ page = 1, limit = 20 }) => `/notifications?page=${page}&limit=${limit}`,
    }),
    
    markNotificationAsRead: builder.mutation<void, string>({
        query: (notificationId) => ({
            url: `/notifications/${notificationId}/read`,
            method: 'PUT',
        }),
    }),
    
    markAllNotificationsAsRead: builder.mutation<void, void>({
        query: () => ({
            url: '/notifications/read-all',
            method: 'PUT',
        }),
        }),
    }),
});

export const {
  // Comment hooks
    useGetCommentsQuery,
    useGetCommentRepliesQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useLikeCommentMutation,
    
    // Dashboard hooks
    useGetDashboardStatsQuery,
    useGetRecentActivityQuery,
    
    // Search hooks
    useSearchAllQuery,
    
    // File upload hooks
    useUploadFileMutation,
    
    // Notification hooks
    useGetNotificationsQuery,
    useMarkNotificationAsReadMutation,
    useMarkAllNotificationsAsReadMutation,
} = apiSlice;