import { http, HttpResponse } from 'msw';
import { mockAuthUser } from '../data/mockData';
import { createResponse } from '..';

export const authHandlers = [
    http.post('/api/auth/login', async ({ request }) => {
        const body = await request.json() as any;
        
        if (body.email === 'john@example.com' && body.password === 'password') {
            return HttpResponse.json(createResponse({
                user: mockAuthUser,
                token: 'mock-jwt-token',
                refreshToken: 'mock-refresh-token',
                expiresIn: 3600
            }, 'Login successful'), { status: 200 });
        }
        
        return HttpResponse.json(
            createResponse(null, '', 'Invalid credentials', false),
            { status: 401 }
        );
    }),

    http.post('/api/auth/register', async ({ request }) => {
        const body = await request.json() as any;
        
        if (body.email && body.username && body.name && body.password) {
        return HttpResponse.json(createResponse({
            user: { ...mockAuthUser, email: body.email, username: body.username, name: body.name },
            token: 'mock-jwt-token',
            refreshToken: 'mock-refresh-token',
            expiresIn: 3600
        }, 'Registration successful'), { status: 201 });
        }
        
        return HttpResponse.json(
            createResponse(null, '', 'Missing required fields', false),
            { status: 400 }
        );
    }),

    http.post('/api/auth/logout', () => {
        return HttpResponse.json(
        createResponse(null, 'Logout successful'),
            { status: 200 }
        );
    }),
];