import { http, HttpResponse } from 'msw';
import { mockBlogs, mockUsers } from '../data/mockData';
import { createPaginatedResponse, createResponse } from '../utils/helpers';
import type { Blog, BlogCreateResponse, BlogDeleteResponse, BlogDetailResponse, BlogListResponse, BlogUpdateResponse } from '../../../models';

export const blogHandlers = [
    http.get('/api/blogs', ({ request }) => {
        const url = new URL(request.url);

        // Pagination
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);

        // Filters
        const search = url.searchParams.get('search')?.toLowerCase() || '';
        const tags = url.searchParams.get('tags')?.split(',') || [];

        // Step 1: Filter
        let filtered = [...mockBlogs];

        if (search) {
            filtered = filtered.filter(blog =>
                blog.title.toLowerCase().includes(search) ||
                blog.excerpt.toLowerCase().includes(search)
            );
        }

        if (tags.length > 0 && tags[0] !== '') {
            filtered = filtered.filter(blog =>
                tags.some(tag => blog.tags.includes(tag))
            );
        }

      
        // Step 2: Paginate
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedItems = filtered.slice(start, end);

        // Step 4: Build response
        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / limit);

        const response: BlogListResponse = {
            success: true,
            successMessage: 'Blogs retrieved successfully',
            failureMessage: '',
            data: paginatedItems,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems,
                hasNext: page < totalPages,
                hasPrev: page > 1,
                limit,
            },
        };

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


        const blogs = mockBlogs.filter(ele => ele.authorId === updatedBlog.authorId);

        const mockUserIndex = mockUsers.findIndex(ele => ele.id === updatedBlog.authorId);
        mockUsers[mockUserIndex].blogs = blogs;

        const response: BlogUpdateResponse = createResponse(mockBlogs[blogIndex], 'Blog updated successfully');
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

    http.post('/api/blogs/:id/like/:likeCount', async ({ params }) => {
        const blogIndex = mockBlogs.findIndex((b) => b.id === params.id);
        if (blogIndex === -1) {
            const errorRes = createResponse(null, '', 'Blog not found', false);
            return HttpResponse.json(errorRes, { status: 404 });
        }

        const likeCount = Number(params.likeCount);

        if (isNaN(likeCount)) {
            const errorRes = createResponse(null, '', 'Invalid like count', false);
            return HttpResponse.json(errorRes, { status: 400 });
        }

        const existingBlog = mockBlogs[blogIndex];
        const updatedBlog: Blog = {
            ...existingBlog,
            likes: likeCount + 1,
        };

        mockBlogs[blogIndex] = updatedBlog;

        const blogs = mockBlogs.filter(ele => ele.authorId === updatedBlog.authorId);
        const mockUserIndex = mockUsers.findIndex(ele => ele.id === updatedBlog.authorId);
        if (mockUserIndex !== -1) {
            mockUsers[mockUserIndex].blogs = blogs;
        }

        const response = createResponse(null, 'Likes updated successfully');
        return HttpResponse.json(response, { status: 200 });
    })
];