export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    color?: string;
    icon?: string;
}



export interface UserSkill {
    id: string;
    userId: string;
    skillId: string;
    skill: Skill;
}

export const SkillCategory = {
    FRONTEND: 'frontend',
    BACKEND: 'backend',
    DATABASE: 'database',
    DEVOPS: 'devops',
    MOBILE: 'mobile',
    DESIGN: 'design',
    TESTING: 'testing',
    OTHER: 'other'
} as const;

export type SkillCategory = typeof SkillCategory[keyof typeof SkillCategory];

export interface CreateSkillInput {
    name: string;
    category: SkillCategory;
    color?: string;
    icon?: string;
}
