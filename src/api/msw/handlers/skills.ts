import { http, HttpResponse } from "msw";
import { mockSkills, mockUsers } from "../data/mockData";
import { createResponse } from "../utils/helpers";
import type { Skill, SkillCreateResponse, SkillListResponse } from "../../../models";

export const skillHandlers = [
    http.get('/api/skills', () => {
        const response: SkillListResponse = createResponse(mockSkills, 'Skills retrieved successfully');
        return HttpResponse.json(response, { status: 200 });
    }),

    http.post('/api/skills', async ({ request }) => {
        const body = await request.json() as Skill;

        if (!body.name || !body.category) {
            const response = createResponse(null, '', 'Name and category are required', false);
            return HttpResponse.json(response, { status: 400 });
        }

        const newSkill = {
            id: Date.now().toString(),
            name: body.name,
            category: body.category,
            color: body.color || '#000000',
            icon: body.icon || 'default-icon',
        };

        mockSkills.push(newSkill);

        const response: SkillCreateResponse = createResponse(newSkill, 'Skill created successfully');
        return HttpResponse.json(response, { status: 201 });
    }),

    http.get('/api/users/:userId/skills', ({ params }) => {
        const userId = params.userId as string;

        const userExists = mockUsers.find(u => u.id === userId);
        if (!userExists) {
            const response = createResponse([], '', 'User not found', false);
            return HttpResponse.json(response, { status: 404 });
        }

        const response: SkillListResponse = createResponse(userExists.skills , 'User skills retrieved successfully');
        return HttpResponse.json(response, { status: 200 });
    }),



    http.post('/api/users/:userId/skills', async ({ params, request }) => {
        const body = await request.json() as Partial<{ skillId: string }>;

        if (!body.skillId) {
            const response = createResponse(null, '', 'Skill ID is required', false);
            return HttpResponse.json(response, { status: 400 });
        }

        const skill = mockSkills.find(s => s.id === body.skillId);
        if (!skill) {
            const response = createResponse(null, '', 'Skill not found', false);
            return HttpResponse.json(response, { status: 404 });
        }

        const user = mockUsers.find(u => u.id === params.userId);
        if (!user) {
            const response = createResponse(null, '', 'User not found', false);
            return HttpResponse.json(response, { status: 404 });
        }

        user.skills.push(skill);

        const response = createResponse({}, 'Skill added to user successfully');
        return HttpResponse.json(response, { status: 201 });
    })


]