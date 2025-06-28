import { http, HttpResponse } from 'msw';
import {type Blog } from '../../../models/Blog';

let mockBlogs: Blog[] = [
    {
        id: '1',
        title: 'Why TypeScript Rocks',
        content: 'TypeScript brings static typing to JavaScript, improving dev experience and code quality.',
        author: 'Alice Johnson',
        createdAt: new Date().toISOString(),
    },
];

export const blogHandlers = [
    http.get('/api/blogs/:id', ({ params }) => {
        const blog = mockBlogs.find((b) => b.id === params.id);
        return HttpResponse.json(blog);
    }),

    http.post('/api/blogs', async ({ request }) => {
        const newBlog = await request.json();
        // Basic runtime check to ensure newBlog matches Blog type
        if (
            !newBlog ||
            typeof newBlog !== 'object' ||
            newBlog === null ||
            typeof newBlog.title !== 'string' ||
            typeof newBlog.content !== 'string' ||
            typeof newBlog.author !== 'string'
        ) {
            return HttpResponse.json({ error: 'Invalid blog data' }, { status: 400 });
        }
        const blogToAdd: Blog = {
            id: (mockBlogs.length + 1).toString(),
            title: newBlog.title,
            content: newBlog.content,
            author: newBlog.author,
            createdAt: new Date().toISOString(),
        };
        mockBlogs.push(blogToAdd);
        return HttpResponse.json(blogToAdd);
    }),
];