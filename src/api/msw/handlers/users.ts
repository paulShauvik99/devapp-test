import { http, HttpResponse } from 'msw';
import { mockBlogs, mockUsers } from '../data/mockData';
import { createPaginatedResponse, createResponse } from '../utils/helpers';
import type { Blog, BlogCreateResponse, SearchResponse, User, UserListResponse } from '../../../models';


export const userHandlers = [
    http.get('/api/users', ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '10');
        const query = url.searchParams.get('query')?.toLowerCase() || '';
        const skill = url.searchParams.get('filter')?.toLowerCase() || '';
        
        console.log(query , skill , page , limit);
        const filtered = mockUsers.filter(user => {
            const nameMatch = user.name.toLowerCase().includes(query);
            const skillMatch = skill
            ? user.skills.some(s => s.name.toLowerCase().includes(skill))
            : true;

            return nameMatch && skillMatch;
        });

        const paginatedRes = filtered.slice((page - 1) * limit, page * limit);


        const response: UserListResponse = createPaginatedResponse(
            paginatedRes,
            page,
            limit,
            filtered,
            'Users retrieved successfully'
        );

        return HttpResponse.json(response, { status: 200 });
    }),

    http.get('/api/users/:id/blogs', ({ params }) => {
        console.log(mockUsers)
        const user = mockUsers.find((b) => b.id === params.id) as User;

        if (user.blogs) {
            const response = createResponse(user.blogs, 'Blog retrieved successfully');
            return HttpResponse.json(response, { status: 200 });
        }

        const response = createResponse(null, '', 'Blog not found', false);
        return HttpResponse.json(response, { status: 404 });
    }),


    http.post('/api/users/:id/blogs', async ({ request, params }) => {
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

        const mockUserIndex = mockUsers.findIndex(ele => ele.id === params.id);
        mockUsers[mockUserIndex].blogs.push(newBlog);

        const response: BlogCreateResponse = createResponse(newBlog, 'Blog created successfully');
        return HttpResponse.json(response, { status: 201 });
    }),


    http.get('/api/users/:id', ({ params }) => {
        const user = mockUsers.find(u => u.id === params.id);

        const response = user
            ? createResponse(user, 'User retrieved successfully')
            : createResponse(null, '', 'User not found', false);

        return HttpResponse.json(response, { status: user ? 200 : 404 });
    }),

    http.get('/api/search/users', ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get('query')?.toLowerCase() || '';
        const skill = url.searchParams.get('skill')?.toLowerCase() || '';
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '10');

        const filtered = mockUsers.filter(user => {
            const nameMatch = user.name.toLowerCase().includes(query);
            const skillMatch = skill
                ? user.skills.some(s => s.name.toLowerCase().includes(skill))
                : true;
            return nameMatch && skillMatch;
        });

        const paginatedRes = filtered.slice((page - 1) * limit, page * limit);

        const response: SearchResponse<typeof mockUsers[0]> = {
            ...createPaginatedResponse(paginatedRes, page, limit, filtered, 'Filtered users retrieved successfully'),
            query,
            filters: { skill }
        };

        return HttpResponse.json(response, { status: 200 });
    })
];