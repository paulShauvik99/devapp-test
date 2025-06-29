import { http, HttpResponse } from "msw";
import { mockComments } from "../data/mockData";
import { createPaginatedResponse , createResponse } from "../utils/helpers";
import type { CommentListResponse , Comment, CommentCreateResponse} from "../../../models";



export const commentsHandlers = [
    
    http.get('/api/blogs/:blogId/comments', ({ params, request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '10');

        const blogComments = mockComments.filter((c) => c.blogId === params.blogId);

        const response: CommentListResponse = createPaginatedResponse(
            blogComments,
            page,
            limit,
            'Comments retrieved successfully'
        );
        return HttpResponse.json(response, { status: 200 });
    }),

    http.post('/api/blogs/:blogId/comments', async ({ params, request }) => {
        const body = await request.json() as Comment;

        if (!body.content) {
            const errorResponse = createResponse(
                null,
                '',
                'Content is required',
                false
            );
            return HttpResponse.json(errorResponse, { status: 400 });
        }

        const newComment: Comment = {
            id: `c${mockComments.length + 1}`,
            content: body.content,
            blogId: params.blogId as string,
            authorId: body.authorId,
            parentId: body.parentId,
            replies: [],
            replyCount: 0,
            likes: 0,
            createdAt: new Date(),
        };

        mockComments.push(newComment);

        const response: CommentCreateResponse = createResponse(newComment, 'Comment created successfully');
        return HttpResponse.json(response, { status: 201 });
    })
]