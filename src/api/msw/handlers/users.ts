import { http, HttpResponse } from 'msw';
import { mockUsers } from '../data/mockData';
import { createPaginatedResponse, createResponse } from '../utils/helpers';


export const userHandlers = [
    http.get('/api/users', ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '10');
        
        return HttpResponse.json(
            createPaginatedResponse(mockUsers, page, limit, 'Users retrieved successfully'),
            { status: 200 }
        );
    }),

    http.get('/api/users/:id', ({ params }) => {
        const user = mockUsers.find(u => u.id === params.id);
        
        if (user) {
            return HttpResponse.json(
                createResponse(user, 'User retrieved successfully'),
                { status: 200 }
            );
        }
        
        return HttpResponse.json(
            createResponse(null, '', 'User not found', false),
            { status: 404 }
        );
    }),

    http.put('/api/users/:id', async ({ params, request }) => {
        const user = mockUsers.find(u => u.id === params.id);
        const body = await request.json() as any;
        
        if (user) {
            const updatedUser = { ...user, ...body, updatedAt: new Date() };
            return HttpResponse.json(
                createResponse(updatedUser, 'User updated successfully'),
                { status: 200 }
            );
        }
        
        return HttpResponse.json(
            createResponse(null, '', 'User not found', false),
            { status: 404 }
        );
    }),

    http.delete('/api/users/:id', ({ params }) => {
        const userIndex = mockUsers.findIndex(u => u.id === params.id);
        
        if (userIndex !== -1) {
            return HttpResponse.json(
                createResponse(null, 'User deleted successfully'),
                { status: 200 }
            );
        }
        
        return HttpResponse.json(
            createResponse(null, '', 'User not found', false),
            { status: 404 }
        );
    }),
];