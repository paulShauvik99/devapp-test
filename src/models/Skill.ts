export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    description?: string;
    color?: string;
    icon?: string;
    isPopular: boolean;
    userCount: number;
    createdAt: Date;
}

export const SkillProficiency = {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert'
} as const;

export type SkillProficiency = typeof SkillProficiency[keyof typeof SkillProficiency]

export interface UserSkill {
    id: string;
    userId: string;
    skillId: string;
    skill: Skill;
    proficiency: SkillProficiency;
    yearsOfExperience?: number;
    addedAt: Date;
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
    description?: string;
    color?: string;
    icon?: string;
}

export interface AddUserSkillInput {
    skillId: string;
    proficiency: SkillProficiency;
    yearsOfExperience?: number;
}