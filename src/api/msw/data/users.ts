import type { User } from "../../../models";
import { mockBlogs } from "./blogs";
import { mockSkills } from "./skills";
import { mockSocialLinks } from "./socialLinks";


export const mockUsers: User[] = [
    {
        id: 'u1',
        email: 'alice@example.com',
        name: 'Alice Johnson',
        password : 'password123',
        bio: 'Frontend engineer specializing in React and TypeScript.',
        avatar: 'https://i.pravatar.cc/150?img=1',
        github: 'https://github.com/alicejohnson',
        linkedin: 'https://linkedin.com/in/alicejohnson',
        twitter: 'https://twitter.com/alice_js',
        skills: mockSkills.slice(0, 3),
        socialLinks: mockSocialLinks.filter(link => link.userId === 'u1'),
        blogs: mockBlogs.filter(b => b.authorId === 'u1'),
        isActive: true,
    },
    {
        id: 'u2',
        email: 'bob@example.com',
        name: 'Bob Smith',
        password : 'password456',
        bio: 'Backend developer with Node.js and Express experience.',
        avatar: 'https://i.pravatar.cc/150?img=2',
        github: 'https://github.com/bobsmith',
        linkedin: 'https://linkedin.com/in/bobsmith',
        twitter: 'https://twitter.com/bobcodes',
        skills: mockSkills.slice(3, 6),
        socialLinks: mockSocialLinks.filter(link => link.userId === 'u2'),
        blogs: mockBlogs.filter(b => b.authorId === 'u2'),
        isActive: true,
    },
    {
        id: 'u3',
        email: 'carla@example.com',
        name: 'Carla Mendes',
        password : 'password789',
        bio: 'Full-stack dev & open source contributor. Loves GraphQL & Prisma.',
        avatar: 'https://i.pravatar.cc/150?img=3',
        github: 'https://github.com/carlamendes',
        linkedin: 'https://linkedin.com/in/carlamendes',
        twitter: 'https://twitter.com/carla_dev',
        skills: mockSkills.slice(1, 4),
        socialLinks: mockSocialLinks.filter(link => link.userId === 'u3'),
        blogs: mockBlogs.filter(b => b.authorId === 'u3'),
        isActive: true,
    },
    {
        id: 'u4',
        email: 'dan@example.com',
        name: 'Dan Chen',
        password : 'password101',
        bio: 'Tech blogger and software architect.',
        avatar: 'https://i.pravatar.cc/150?img=4',
        github: 'https://github.com/danchen',
        linkedin: 'https://linkedin.com/in/danchen',
        twitter: 'https://twitter.com/dan_codes',
        skills: mockSkills.slice(0, 2),
        socialLinks: mockSocialLinks.filter(link => link.userId === 'u4'),
        blogs: [],
        isActive: false,
    }
];