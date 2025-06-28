import { http, HttpResponse } from "msw";
import { mockSkills } from "../data/mockData";
import { createResponse } from "../utils/helpers";

export const skillHandlers = [
    http.get('/api/skills', () => {
        return HttpResponse.json(
        createResponse(
            mockSkills, 'Skills retrieved successfully'),
            { status: 200 }
        );
    }),

    http.post('/api/skills', async ({ request }) => {
        const body = await request.json() as any;
        
        if (body.name && body.category) {
            const newSkill = {
                id: Date.now().toString(),
                ...body,
                isPopular: false,
                userCount: 0,
                createdAt: new Date()
            };
            
            return HttpResponse.json(
                createResponse(newSkill, 'Skill created successfully'),
                { status: 201 }
            );
        }
        
        return HttpResponse.json(
            createResponse(null, '', 'Name and category are required', false),
            { status: 400 }
        );
    }),

    // User Skills endpoints
    http.get('/api/users/:userId/skills', ({ params }) => {
        const userSkills = mockSkills.slice(0, 2).map(skill => ({
            id: Date.now().toString(),
            userId: params.userId as string,
            skillId: skill.id,
            skill,
            proficiency: 'intermediate' as const,
            yearsOfExperience: 3,
            addedAt: new Date()
        }));
        
        return HttpResponse.json(
            createResponse(userSkills, 'User skills retrieved successfully'),
            { status: 200 }
        );
    }),

    http.post('/api/users/:userId/skills', async ({ params, request }) => {
        const body = await request.json() as any;
        
        if (body.skillId && body.proficiency) {
            const skill = mockSkills.find(s => s.id === body.skillId);
            if (skill) {
                const userSkill = {
                    id: Date.now().toString(),
                    userId: params.userId as string,
                    skillId: body.skillId,
                    skill,
                    proficiency: body.proficiency,
                    yearsOfExperience: body.yearsOfExperience,
                    addedAt: new Date()
                };
                
                return HttpResponse.json(
                    createResponse(userSkill, 'Skill added to user successfully'),
                    { status: 201 }
                );
            }
        }
        
        return HttpResponse.json(
            createResponse(null, '', 'Invalid skill or proficiency', false),
            { status: 400 }
        );
    }),
]