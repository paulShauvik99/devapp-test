import type { Blog } from "../../../models";
import { mockUsers } from "./users";

export const mockBlogs: Blog[] = [
    {
        id: '1',
        title: 'Getting Started with React Hooks',
        content: 'React Hooks revolutionized the way we write React components...',
        excerpt: 'Learn the basics of React Hooks and how they can improve your code.',
        slug: 'getting-started-with-react-hooks',
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        authorId: '1',
        author: mockUsers[0],
        tags: ['react', 'javascript', 'hooks'],
        isPublished: true,
        isDraft: false,
        comments: [],
        commentCount: 5,
        readTime: 8,
        views: 1250,
        likes: 45,
        createdAt: new Date('2024-11-15'),
        updatedAt: new Date('2024-11-16'),
        publishedAt: new Date('2024-11-15')
    },
    {
        id: '2',
        title: 'TypeScript Best Practices',
        content: 'TypeScript helps catch errors early and improves code quality...',
        excerpt: 'Essential TypeScript patterns and practices for better code.',
        slug: 'typescript-best-practices',
        coverImage: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800',
        authorId: '2',
        author: mockUsers[1],
        tags: ['typescript', 'javascript', 'best-practices'],
        isPublished: true,
        isDraft: false,
        comments: [],
        commentCount: 3,
        readTime: 12,
        views: 890,
        likes: 32,
        createdAt: new Date('2024-11-10'),
        updatedAt: new Date('2024-11-11'),
        publishedAt: new Date('2024-11-10')
    }
];
