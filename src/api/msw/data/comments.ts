import type { Comment } from '../../../models';


export const mockComments: Comment[] = [
    {
        id: 'c1',
        content: 'This explanation of Concurrent Mode is super helpful!',
        blogId: 'b1',
        authorName: 'u2',
        replyCount: 1,
        replies: [],
        likes: 10,
        createdAt: new Date('2024-05-02T10:30:00Z'),
    },
    {
        id: 'c2',
        content: 'Great summary of TypeScript 5.5 features.',
        blogId: 'b2',
        authorName: 'u3',
        replyCount: 0,
        replies: [],
        likes: 5,
        createdAt: new Date('2024-06-12T14:20:00Z'),
    },
    {
        id: 'c3',
        content: 'Thanks for explaining Tailwind setup strategies. Very clean!',
        blogId: 'b3',
        authorName: 'u4',
        replyCount: 2,
        replies: [],
        likes: 7,
        createdAt: new Date('2024-04-16T09:00:00Z'),
    },
    {
        id: 'c4',
        content: 'Can you give an example of when to choose OAuth2 over JWT?',
        blogId: 'b4',
        authorName: 'u3',
        replyCount: 0,
        replies: [],
        likes: 12,
        createdAt: new Date('2024-03-21T17:45:00Z'),
    },
    {
        id: 'c5',
        content: 'I think Redis is also worth mentioning for API scaling!',
        blogId: 'b5',
        authorName: 'u1',
        replyCount: 0,
        replies: [],
        likes: 4,
        createdAt: new Date('2024-02-11T08:15:00Z'),
    },
    {
        id: 'c6',
        content: 'Totally agree, React 18 finally feels like a modern framework.',
        blogId: 'b1',
        authorName: 'u3',
        parentId: 'c1',
        replyCount: 0,
        replies: [],
        likes: 6,
        createdAt: new Date('2024-05-02T11:00:00Z'),
    },
    {
        id: 'c7',
        content: 'Yes! Tailwind with component extraction has saved us a lot of time.',
        blogId: 'b3',
        authorName: 'u1',
        parentId: 'c3',
        replyCount: 0,
        replies: [],
        likes: 3,
        createdAt: new Date('2024-04-16T09:30:00Z'),
    },
    {
        id: 'c8',
        content: 'Very useful breakdown of API middleware layering!',
        blogId: 'b5',
        authorName: 'u4',
        replyCount: 0,
        replies: [],
        likes: 2,
        createdAt: new Date('2024-02-11T09:45:00Z'),
    },
];