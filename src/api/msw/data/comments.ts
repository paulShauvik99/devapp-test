import type { Comment } from '../../../models';
import { mockUsers } from './users';

export const mockComments: Comment[] = [
    {
        id: '1',
        content: 'Great article! Really helped me understand hooks better.',
        blogId: '1',
        authorId: '2',
        author: mockUsers[1],
        replyCount: 1,
        likes: 5,
        isEdited: false,
        isDeleted: false,
        createdAt: new Date('2024-11-16'),
        updatedAt: new Date('2024-11-16')
    },
    {
        id: '2',
        content: 'Thanks for the detailed explanation on TypeScript!',
        blogId: '2',
        authorId: '1',
        author: mockUsers[0],
        replyCount: 0,
        likes: 2,
        isEdited: false,
        isDeleted: false,
        createdAt: new Date('2024-11-12'),
        updatedAt: new Date('2024-11-12')
    }
];