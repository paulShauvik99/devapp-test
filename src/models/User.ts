import type { Blog } from './Blog';
import type { Skill } from './Skill';
import type { SocialLink } from './SocialLink';

export interface User {
    id: string;
    email: string;
    name: string;
    password: string;
    bio?: string;
    avatar?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    skills: Skill[];
    socialLinks: SocialLink[];
    blogs: Blog[];
    isActive: boolean;
}

export interface CreateUserInput {
    email: string;
    name: string;
    password: string;
    bio?: string;
    avatar?: string;
}

export interface UpdateUserInput {
    name?: string;
    bio?: string;
    avatar?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
}

export interface UserProfile extends User {
    blogCount: number;
    skillsCount: number;
}

export interface DeveloperSearchFilters {
    skills?: string[];
    page?: number;
    limit?: number;
}