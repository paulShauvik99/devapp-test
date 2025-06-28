import { http, HttpResponse } from "msw";
import { mockSocialLinks } from "../data/mockData";
import { createResponse } from "../utils/helpers";

export const socialLinksHandlers = [
    http.get('/api/users/:userId/social-links', ({ params }) => {
        const userSocialLinks = mockSocialLinks.filter(sl => sl.userId === params.userId);
        
        return HttpResponse.json(
            createResponse(userSocialLinks, 'Social links retrieved successfully'),
            { status: 200 }
        );
    }),

    http.post('/api/users/:userId/social-links', async ({ params, request }) => {
        const body = await request.json() as any;
        
        if (body.platform && body.url) {
            const newSocialLink = {
                id: Date.now().toString(),
                userId: params.userId as string,
                platform: body.platform,
                url: body.url,
                username: body.username,
                isVerified: false,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            return HttpResponse.json(
                createResponse(newSocialLink, 'Social link added successfully'),
                { status: 201 }
            );
        }
        
        return HttpResponse.json(
            createResponse(null, '', 'Platform and URL are required', false),
            { status: 400 }
        );
    }),

    http.put('/api/social-links/:id', async ({ params, request }) => {
        const socialLink = mockSocialLinks.find(sl => sl.id === params.id);
        const body = await request.json() as any;
        
        if (socialLink) {
            const updatedLink = { ...socialLink, ...body, updatedAt: new Date() };
            return HttpResponse.json(
                createResponse(updatedLink, 'Social link updated successfully'),
                { status: 200 }
            );
        }
        
        return HttpResponse.json(
            createResponse(null, '', 'Social link not found', false),
            { status: 404 }
        );
    }),

    http.delete('/api/social-links/:id', ({ params }) => {
        const linkIndex = mockSocialLinks.findIndex(sl => sl.id === params.id);
        
        if (linkIndex !== -1) {
            return HttpResponse.json(
                createResponse(null, 'Social link deleted successfully'),
                { status: 200 }
            );
        }
        
        return HttpResponse.json(
            createResponse(null, '', 'Social link not found', false),
            { status: 404 }
        );
    })
];