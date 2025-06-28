import type { AuthUser, User, UserRole } from "../../../models";


export const mockUsers: User[] = [
    {
        id: '1',
        email: 'john@example.com',
        username: 'johndoe',
        name: 'John Doe',
        bio: 'Full-stack developer passionate about React and Node.js',
        avatar: 'https://i.pravatar.cc/150?img=1',
        location: 'San Francisco, CA',
        website: 'https://johndoe.dev',
        github: 'johndoe',
        linkedin: 'john-doe',
        twitter: 'johndoe',
        skills: [],
        socialLinks: [],
        blogs: [],
        isActive: true,
        joinedAt: new Date('2023-01-15'),
        updatedAt: new Date('2024-12-01')
    },
    {
        id: '2',
        email: 'sarah@example.com',
        username: 'sarahtech',
        name: 'Sarah Chen',
        bio: 'Frontend developer specializing in React and TypeScript',
        avatar: 'https://i.pravatar.cc/150?img=2',
        location: 'New York, NY',
        website: 'https://sarahchen.dev',
        github: 'sarahtech',
        linkedin: 'sarah-chen',
        twitter: 'sarahtech',
        skills: [],
        socialLinks: [],
        blogs: [],
        isActive: true,
        joinedAt: new Date('2023-03-20'),
        updatedAt: new Date('2024-11-28')
    }
];


export const mockAuthUser: AuthUser = {
    id: '1',
    email: 'john@example.com',
    username: 'johndoe',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'user' as UserRole,
    isVerified: true
};