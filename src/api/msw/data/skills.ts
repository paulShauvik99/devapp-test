import type { Skill, SkillCategory } from "../../../models";


export const mockSkills: Skill[] = [
    {
        id: '1',
        name: 'React',
        category: 'frontend' as SkillCategory,
        description: 'JavaScript library for building user interfaces',
        color: '#61DAFB',
        icon: 'react',
        isPopular: true,
        userCount: 150,
        createdAt: new Date('2023-01-01')
    },
    {
        id: '2',
        name: 'Node.js',
        category: 'backend' as SkillCategory,
        description: 'JavaScript runtime for server-side development',
        color: '#339933',
        icon: 'nodejs',
        isPopular: true,
        userCount: 120,
        createdAt: new Date('2023-01-01')
    },
    {
        id: '3',
        name: 'TypeScript',
        category: 'frontend' as SkillCategory,
        description: 'Typed superset of JavaScript',
        color: '#3178C6',
        icon: 'typescript',
        isPopular: true,
        userCount: 100,
        createdAt: new Date('2023-01-01')
    }
];
