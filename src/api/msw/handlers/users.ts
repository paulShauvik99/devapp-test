import { http, HttpResponse } from 'msw';
import { mockUsers } from '../data/mockData';
import { createPaginatedResponse, createResponse } from '../utils/helpers';
import type { SearchResponse, UserListResponse } from '../../../models';


export const userHandlers = [
    http.get('/api/users', ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '10');

        const response: UserListResponse = createPaginatedResponse(
            mockUsers,
            page,
            limit,
            'Users retrieved successfully'
        );

        return HttpResponse.json(response, { status: 200 });
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

        const response: SearchResponse<typeof mockUsers[0]> = {
            ...createPaginatedResponse(filtered, page, limit, 'Filtered users retrieved successfully'),
            query,
            filters: { skill }
        };

        return HttpResponse.json(response, { status: 200 });
    })
];