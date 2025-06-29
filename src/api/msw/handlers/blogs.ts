import { http, HttpResponse } from 'msw';
import { mockBlogs, mockUsers } from '../data/mockData';
import { createPaginatedResponse, createResponse } from '../utils/helpers';
import type { Blog, BlogCreateResponse, BlogDeleteResponse, BlogDetailResponse, BlogListResponse, BlogUpdateResponse } from '../../../models';

export const blogHandlers = [
    http.get('/api/blogs', ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '10');

        const response: BlogListResponse = createPaginatedResponse(mockBlogs, page, limit, 'Blogs retrieved successfully');
        return HttpResponse.json(response, { status: 200 });
    }),

    http.get('/api/blogs/:id', ({ params }) => {
        const blog = mockBlogs.find((b) => b.id === params.id);

        if (blog) {
        const response: BlogDetailResponse = createResponse(blog, 'Blog retrieved successfully');
        return HttpResponse.json(response, { status: 200 });
        }

        const response = createResponse(null, '', 'Blog not found', false);
        return HttpResponse.json(response, { status: 404 });
    }),

    http.post('/api/blogs', async ({ request }) => {
        const body = await request.json() as Partial<Blog>;

        if (!body.title || !body.content) {
            const errorRes = createResponse(null, '', 'Title and content are required', false);
            return HttpResponse.json(errorRes, { status: 400 });
        }

        const newBlog: Blog = {
            id: `u${mockBlogs.length + 1}`,
            title: body.title,
            content: body.content,
            excerpt: body.content.slice(0, 150),
            tags: body.tags || [],
            authorId: mockUsers[0].id,
            isPublished: body.isPublished ?? false,
            comments: [],
            commentCount: 0,
            likes: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            publishedAt: body.isPublished ? new Date() : undefined,
        };

        mockBlogs.push(newBlog);

        const response: BlogCreateResponse = createResponse(newBlog, 'Blog created successfully');
        return HttpResponse.json(response, { status: 201 });
    }),

    http.put('/api/blogs/:id', async ({ params, request }) => {
        const blogIndex = mockBlogs.findIndex((b) => b.id === params.id);
        const body = await request.json() as Partial<Blog>;

        if (blogIndex === -1) {
            const errorRes = createResponse(null, '', 'Blog not found', false);
            return HttpResponse.json(errorRes, { status: 404 });
        }

        const existingBlog = mockBlogs[blogIndex];

        const updatedBlog: Blog = {
            ...existingBlog,
            title: body.title || existingBlog.title,
            content: body.content || existingBlog.content,
            excerpt: body.excerpt || existingBlog.excerpt,
            tags: body.tags || existingBlog.tags,
            isPublished: body.isPublished ?? existingBlog.isPublished,
            publishedAt: body.isPublished && !existingBlog.publishedAt ? new Date() : existingBlog.publishedAt,
            updatedAt: new Date(),
        };

        mockBlogs[blogIndex] = updatedBlog;

        const response: BlogUpdateResponse = createResponse(updatedBlog, 'Blog updated successfully');
        return HttpResponse.json(response, { status: 200 });
    }),

    http.delete('/api/blogs/:id', ({ params }) => {
        const blogIndex = mockBlogs.findIndex((b) => b.id === params.id);

        if (blogIndex === -1) {
            const errorRes = createResponse(null, '', 'Blog not found', false);
            return HttpResponse.json(errorRes, { status: 404 });
        }

        mockBlogs.splice(blogIndex, 1);
        const response: BlogDeleteResponse = createResponse(null, 'Blog deleted successfully');
        return HttpResponse.json(response, { status: 200 });
    }),
];