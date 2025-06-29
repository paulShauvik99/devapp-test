import { http, HttpResponse } from "msw";
import { mockSocialLinks } from "../data/mockData";
import { createResponse } from "../utils/helpers";
import type { SocialLinkCreateResponse, SocialLinkListResponse, SocialPlatform } from "../../../models";

export const socialLinksHandlers = [
    http.get('/api/users/:userId/social-links', ({ params }) => {
        const userSocialLinks = mockSocialLinks.filter(sl => sl.userId === params.userId);

        const response: SocialLinkListResponse = createResponse(
            userSocialLinks,
            'Social links retrieved successfully'
        );
        return HttpResponse.json(response, { status: 200 });
    }),


    http.post('/api/users/:userId/social-links', async ({ params, request }) => {
        const body = await request.json() as Partial<{
            platform: string;
            url: string;
            name?: string;
        }>;

        if (!body.platform || !body.url) {
            const response = createResponse(null, '', 'Platform and URL are required', false);
            return HttpResponse.json(response, { status: 400 });
        }

        const newSocialLink = {
            id: `sl${mockSocialLinks.length + 1}`,
            userId: params.userId as string,
            platform: body.platform as SocialPlatform,
            url: body.url,
            name: body.name,
        };

        mockSocialLinks.push(newSocialLink);

        const response: SocialLinkCreateResponse = createResponse(
            newSocialLink,
            'Social link added successfully'
        );
        return HttpResponse.json(response, { status: 201 });
    })
];