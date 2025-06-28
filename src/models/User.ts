import type { Blog } from './Blog';
import type { Skill, UserSkill } from './Skill';
import type { SocialLink } from './SocialLink';

export interface User {
    id: string;
    email: string;
    username: string;
    name: string;
    bio?: string;
    avatar?: string;
    location?: string;
    website?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    skills: Skill[];
    socialLinks: SocialLink[];
    blogs: Blog[];
    isActive: boolean;
    joinedAt: Date;
    updatedAt: Date;
}

export interface CreateUserInput {
    email: string;
    username: string;
    name: string;
    password: string;
    bio?: string;
    avatar?: string;
    location?: string;
    website?: string;
}

export interface UpdateUserInput {
    name?: string;
    bio?: string;
    avatar?: string;
    location?: string;
    website?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
}

export interface UserProfile extends Omit<User, 'email'> {
    blogCount: number;
    skillsCount: number;
}

export interface DeveloperSearchFilters {
    skills?: string[];
    location?: string;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: 'name' | 'joinedAt' | 'blogCount';
    sortOrder?: 'asc' | 'desc';
}