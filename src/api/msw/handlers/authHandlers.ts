import { http, HttpResponse } from 'msw';

export const authHandlers = [
    http.post('/api/login', async ({ request }) => {
        const body = await request.json() as { email: string };
        return HttpResponse.json({
        token: 'mock-jwt-token',
        user: { email: body.email, name: 'Mock User' },
        });
    }),

    http.post('/api/register', async ({ request }) => {
        const body = await request.json() as { email: string; name: string };
        return HttpResponse.json({
        token: 'mock-jwt-token',
        user: { email: body.email, name: body.name },
        });
    }),
];