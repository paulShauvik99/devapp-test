import { http, HttpResponse } from 'msw';
import {type Developer } from '../../../models/Developer';

const mockDevelopers: Developer[] = [
        {
            id: '1',
            name: 'Alice Johnson',
            bio: 'Frontend engineer passionate about design systems.',
            skills: ['React', 'TypeScript', 'CSS'],
            github: 'https://github.com/alicejohnson',
        },
        {
            id: '2',
            name: 'Bob Smith',
            bio: 'Backend wizard who loves APIs and databases.',
            skills: ['Node.js', 'Express', 'MongoDB'],
            github: 'https://github.com/bsmith',
        },
];

export const developerHandlers = [
    http.get('/api/developers', () => {
        return HttpResponse.json(mockDevelopers);
    }),

    http.get('/api/developers/:id', ({ params }) => {
        const dev = mockDevelopers.find((d) => d.id === params.id);
        return HttpResponse.json(dev);
    }),
];