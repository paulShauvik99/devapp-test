import { http, HttpResponse } from "msw";
import { mockUsers , mockComments } from "../data/mockData";
import { createPaginatedResponse , createResponse } from "../utils/helpers";



export const commentsHandlers = [
    http.get('/api/blogs/:blogId/comments', ({ params, request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '10');
        
        const blogComments = mockComments.filter(c => c.blogId === params.blogId);
        
        return HttpResponse.json(
        createPaginatedResponse(blogComments, page, limit, 'Comments retrieved successfully'),
        { status: 200 }
        );
    }),

    http.post('/api/blogs/:blogId/comments', async ({ params, request }) => {
        const body = await request.json() as any;
        
        if (body.content) {
            const newComment = {
                id: Date.now().toString(),
                content: body.content,
                blogId: params.blogId as string,
                authorId: '1',
                author: mockUsers[0],
                parentId: body.parentId,
                replyCount: 0,
                likes: 0,
                isEdited: false,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            return HttpResponse.json(
                createResponse(newComment, 'Comment created successfully'),
                { status: 201 }
            );
        }
        
        return HttpResponse.json(
            createResponse(null, '', 'Content is required', false),
            { status: 400 }
        );
    }),

    http.put('/api/comments/:id', async ({ params, request }) => {
        const comment = mockComments.find(c => c.id === params.id);
        const body = await request.json() as any;
        
        if (comment) {
            const updatedComment = { 
                ...comment, 
                content: body.content, 
                isEdited: true, 
                updatedAt: new Date() 
            };
            return HttpResponse.json(
                createResponse(updatedComment, 'Comment updated successfully'),
                { status: 200 }
            );
        }
        
        return HttpResponse.json(
            createResponse(null, '', 'Comment not found', false),
            { status: 404 }
        );
    }),

    http.delete('/api/comments/:id', ({ params }) => {
        const commentIndex = mockComments.findIndex(c => c.id === params.id);
        
        if (commentIndex !== -1) {
            return HttpResponse.json(
                createResponse(null, 'Comment deleted successfully'),
                { status: 200 }
            );
        }
        
        return HttpResponse.json(
            createResponse(null, '', 'Comment not found', false),
            { status: 404 }
        );
    }),
]