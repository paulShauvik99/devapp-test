import { http, HttpResponse } from 'msw';
import { mockBlogs, mockUsers } from '../data/mockData';
import { createPaginatedResponse, createResponse } from '../utils/helpers';

export const blogHandlers = [
    http.get('/api/blogs', ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '10');
        
        return HttpResponse.json(
            createPaginatedResponse(mockBlogs, page, limit, 'Blogs retrieved successfully'),
            { status: 200 }
        );
    }),

    http.get('/api/blogs/:id', ({ params }) => {
        const blog = mockBlogs.find(b => b.id === params.id);
        
        if (blog) {
            return HttpResponse.json(
                createResponse(blog, 'Blog retrieved successfully'),
                { status: 200 }
            );
        }
        
        return HttpResponse.json(
            createResponse(null, '', 'Blog not found', false),
            { status: 404 }
        );
    }),

    http.post('/api/blogs', async ({ request }) => {
        const body = await request.json() as any;
        
        if (body.title && body.content) {
            const newBlog = {
                id: Date.now().toString(),
                ...body,
                authorId: '1',
                author: mockUsers[0],
                slug: body.title.toLowerCase().replace(/\s+/g, '-'),
                commentCount: 0,
                views: 0,
                likes: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            return HttpResponse.json(
                createResponse(newBlog, 'Blog created successfully'),
                { status: 201 }
            );
        }
        
        return HttpResponse.json(
            createResponse(null, '', 'Title and content are required', false),
            { status: 400 }
        );
    }),

    http.put('/api/blogs/:id', async ({ params, request }) => {
        const blog = mockBlogs.find(b => b.id === params.id);
        const body = await request.json() as any;
        
        if (blog) {
            const updatedBlog = { ...blog, ...body, updatedAt: new Date() };
            return HttpResponse.json(
                createResponse(updatedBlog, 'Blog updated successfully'),
                { status: 200 }
            );
        }
        
        return HttpResponse.json(
            createResponse(null, '', 'Blog not found', false),
            { status: 404 }
        );
    }),

    http.delete('/api/blogs/:id', ({ params }) => {
        const blogIndex = mockBlogs.findIndex(b => b.id === params.id);
        
        if (blogIndex !== -1) {
            return HttpResponse.json(
                createResponse(null, 'Blog deleted successfully'),
                { status: 200 }
            );
        }
        
        return HttpResponse.json(
            createResponse(null, '', 'Blog not found', false),
            { status: 404 }
        );
    }),
];