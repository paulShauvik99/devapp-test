import type { Blog } from "../../../models";
import { mockComments } from "./comments";

export const mockBlogs: Blog[] = [
    {
        id: 'b1',
        title: 'Understanding React 18 Concurrent Mode',
        content:
            'React 18 introduces a powerful feature called Concurrent Mode, which allows React to interrupt rendering work to handle more urgent updates. This improves the responsiveness of the app by making rendering non-blocking. It includes features like automatic batching, startTransition, and Suspense improvements. Understanding how to properly use Concurrent Mode is essential for building performant modern apps.',
        authorId: 'u1',
        excerpt: 'React 18 introduces concurrent rendering for better performance...',
        tags: ['React', 'JavaScript', 'Frontend'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b1'),
        commentCount: 2,
        likes: 45,
        createdAt: new Date('2024-05-01'),
        updatedAt: new Date('2024-05-03'),
        publishedAt: new Date('2024-05-02'),
    },
    {
        id: 'b2',
        title: 'What’s New in TypeScript 5.5',
        content:
        'TypeScript 5.5 introduces several improvements, including enhanced type inference, new utility types, and faster incremental builds. It also fixes long-standing bugs related to type narrowing and inference across deeply nested structures. Developers can now benefit from more predictable type-checking and smarter autocompletion in their editors. The update also improves support for JSX and template literal types.',
        authorId: 'u2',
        excerpt: 'Explore the key features and improvements in TypeScript 5.5...',
        tags: ['TypeScript', 'JavaScript', 'Programming'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b2'),
        commentCount: 1,
        likes: 28,
        createdAt: new Date('2024-06-10'),
        updatedAt: new Date('2024-06-12'),
        publishedAt: new Date('2024-06-11'),
    },
    {
        id: 'b3',
        title: 'Mastering Tailwind CSS in Large Projects',
        content:
        'Tailwind CSS can become unwieldy in large-scale applications without proper structure. This post covers best practices such as using configuration presets, component extraction, and dark mode management. It also explores how to integrate Tailwind with utility-first design and atomic class organization. By following a scalable methodology, teams can maintain consistency and avoid bloated stylesheets.',
        authorId: 'u3',
        excerpt: 'Best practices for scalable Tailwind CSS setups...',
        tags: ['CSS', 'Tailwind', 'Frontend'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b3'),
        commentCount: 3,
        likes: 33,
        createdAt: new Date('2024-04-15'),
        updatedAt: new Date('2024-04-16'),
        publishedAt: new Date('2024-04-15'),
    },
    {
        id: 'b4',
        title: 'JWT vs OAuth2: Which Auth Method Should You Use?',
        content:
        'JWT (JSON Web Tokens) and OAuth2 are two common methods for handling authentication. JWT is simple, stateless, and widely used for token-based systems, whereas OAuth2 is more complex and better suited for delegated authorization across multiple services. This blog breaks down their core differences, pros and cons, and real-world use cases so developers can choose the right method for their project needs.',
        authorId: 'u1',
        excerpt: 'JWT and OAuth2 are popular auth methods, but they serve different needs...',
        tags: ['Authentication', 'Security', 'JWT', 'OAuth2'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b4'),
        commentCount: 4,
        likes: 51,
        createdAt: new Date('2024-03-20'),
        updatedAt: new Date('2024-03-22'),
        publishedAt: new Date('2024-03-21'),
    },
    {
        id: 'b5',
        title: 'Building Scalable APIs with Node.js and Express',
        content:
        'Building scalable APIs requires a well-structured backend architecture. In this post, we explore key principles using Node.js and Express such as modular routing, middleware composition, error handling, and request validation. We also cover rate limiting, token-based authentication, and how to prepare your Express app for future scaling with tools like Redis, message queues, and containerization.',
        authorId: 'u1',
        excerpt: 'Scalable API design using Node.js and Express, with middleware and modular routing...',
        tags: ['Node.js', 'Express', 'Backend', 'API'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b5'),
        commentCount: 2,
        likes: 40,
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-02-11'),
        publishedAt: new Date('2024-02-10'),
    },
    {
        id: 'b6',
        title: 'Understanding React 18 Concurrent Mode',
        content:
            'React 18 introduces a powerful feature called Concurrent Mode, which allows React to interrupt rendering work to handle more urgent updates. This improves the responsiveness of the app by making rendering non-blocking. It includes features like automatic batching, startTransition, and Suspense improvements. Understanding how to properly use Concurrent Mode is essential for building performant modern apps.',
        authorId: 'u1',
        excerpt: 'React 18 introduces concurrent rendering for better performance...',
        tags: ['React', 'JavaScript', 'Frontend'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b6'),
        commentCount: 2,
        likes: 45,
        createdAt: new Date('2024-05-01'),
        updatedAt: new Date('2024-05-03'),
        publishedAt: new Date('2024-05-02'),
    },
    {
        id: 'b7',
        title: 'What’s New in TypeScript 5.5',
        content:
        'TypeScript 5.5 introduces several improvements, including enhanced type inference, new utility types, and faster incremental builds. It also fixes long-standing bugs related to type narrowing and inference across deeply nested structures. Developers can now benefit from more predictable type-checking and smarter autocompletion in their editors. The update also improves support for JSX and template literal types.',
        authorId: 'u2',
        excerpt: 'Explore the key features and improvements in TypeScript 5.5...',
        tags: ['TypeScript', 'JavaScript', 'Programming'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b7'),
        commentCount: 1,
        likes: 28,
        createdAt: new Date('2024-06-10'),
        updatedAt: new Date('2024-06-12'),
        publishedAt: new Date('2024-06-11'),
    },
    {
        id: 'b8',
        title: 'Mastering Tailwind CSS in Large Projects',
        content:
        'Tailwind CSS can become unwieldy in large-scale applications without proper structure. This post covers best practices such as using configuration presets, component extraction, and dark mode management. It also explores how to integrate Tailwind with utility-first design and atomic class organization. By following a scalable methodology, teams can maintain consistency and avoid bloated stylesheets.',
        authorId: 'u3',
        excerpt: 'Best practices for scalable Tailwind CSS setups...',
        tags: ['CSS', 'Tailwind', 'Frontend'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b8'),
        commentCount: 3,
        likes: 33,
        createdAt: new Date('2024-04-15'),
        updatedAt: new Date('2024-04-16'),
        publishedAt: new Date('2024-04-15'),
    },
    {
        id: 'b9',
        title: 'JWT vs OAuth2: Which Auth Method Should You Use?',
        content:
        'JWT (JSON Web Tokens) and OAuth2 are two common methods for handling authentication. JWT is simple, stateless, and widely used for token-based systems, whereas OAuth2 is more complex and better suited for delegated authorization across multiple services. This blog breaks down their core differences, pros and cons, and real-world use cases so developers can choose the right method for their project needs.',
        authorId: 'u1',
        excerpt: 'JWT and OAuth2 are popular auth methods, but they serve different needs...',
        tags: ['Authentication', 'Security', 'JWT', 'OAuth2'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b9'),
        commentCount: 4,
        likes: 51,
        createdAt: new Date('2024-03-20'),
        updatedAt: new Date('2024-03-22'),
        publishedAt: new Date('2024-03-21'),
    },
    {
        id: 'b10',
        title: 'Building Scalable APIs with Node.js and Express',
        content:
        'Building scalable APIs requires a well-structured backend architecture. In this post, we explore key principles using Node.js and Express such as modular routing, middleware composition, error handling, and request validation. We also cover rate limiting, token-based authentication, and how to prepare your Express app for future scaling with tools like Redis, message queues, and containerization.',
        authorId: 'u1',
        excerpt: 'Scalable API design using Node.js and Express, with middleware and modular routing...',
        tags: ['Node.js', 'Express', 'Backend', 'API'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b10'),
        commentCount: 2,
        likes: 40,
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-02-11'),
        publishedAt: new Date('2024-02-10'),
    },
    {
        id: 'b11',
        title: 'Understanding React 18 Concurrent Mode',
        content:
            'React 18 introduces a powerful feature called Concurrent Mode, which allows React to interrupt rendering work to handle more urgent updates. This improves the responsiveness of the app by making rendering non-blocking. It includes features like automatic batching, startTransition, and Suspense improvements. Understanding how to properly use Concurrent Mode is essential for building performant modern apps.',
        authorId: 'u1',
        excerpt: 'React 18 introduces concurrent rendering for better performance...',
        tags: ['React', 'JavaScript', 'Frontend'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b11'),
        commentCount: 2,
        likes: 45,
        createdAt: new Date('2024-05-01'),
        updatedAt: new Date('2024-05-03'),
        publishedAt: new Date('2024-05-02'),
    },
    {
        id: 'b12',
        title: 'What’s New in TypeScript 5.5',
        content:
        'TypeScript 5.5 introduces several improvements, including enhanced type inference, new utility types, and faster incremental builds. It also fixes long-standing bugs related to type narrowing and inference across deeply nested structures. Developers can now benefit from more predictable type-checking and smarter autocompletion in their editors. The update also improves support for JSX and template literal types.',
        authorId: 'u2',
        excerpt: 'Explore the key features and improvements in TypeScript 5.5...',
        tags: ['TypeScript', 'JavaScript', 'Programming'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b12'),
        commentCount: 1,
        likes: 28,
        createdAt: new Date('2024-06-10'),
        updatedAt: new Date('2024-06-12'),
        publishedAt: new Date('2024-06-11'),
    },
    {
        id: 'b13',
        title: 'Mastering Tailwind CSS in Large Projects',
        content:
        'Tailwind CSS can become unwieldy in large-scale applications without proper structure. This post covers best practices such as using configuration presets, component extraction, and dark mode management. It also explores how to integrate Tailwind with utility-first design and atomic class organization. By following a scalable methodology, teams can maintain consistency and avoid bloated stylesheets.',
        authorId: 'u3',
        excerpt: 'Best practices for scalable Tailwind CSS setups...',
        tags: ['CSS', 'Tailwind', 'Frontend'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b13'),
        commentCount: 3,
        likes: 33,
        createdAt: new Date('2024-04-15'),
        updatedAt: new Date('2024-04-16'),
        publishedAt: new Date('2024-04-15'),
    },
    {
        id: 'b14',
        title: 'JWT vs OAuth2: Which Auth Method Should You Use?',
        content:
        'JWT (JSON Web Tokens) and OAuth2 are two common methods for handling authentication. JWT is simple, stateless, and widely used for token-based systems, whereas OAuth2 is more complex and better suited for delegated authorization across multiple services. This blog breaks down their core differences, pros and cons, and real-world use cases so developers can choose the right method for their project needs.',
        authorId: 'u1',
        excerpt: 'JWT and OAuth2 are popular auth methods, but they serve different needs...',
        tags: ['Authentication', 'Security', 'JWT', 'OAuth2'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b14'),
        commentCount: 4,
        likes: 51,
        createdAt: new Date('2024-03-20'),
        updatedAt: new Date('2024-03-22'),
        publishedAt: new Date('2024-03-21'),
    },
    {
        id: 'b15',
        title: 'Building Scalable APIs with Node.js and Express',
        content:
        'Building scalable APIs requires a well-structured backend architecture. In this post, we explore key principles using Node.js and Express such as modular routing, middleware composition, error handling, and request validation. We also cover rate limiting, token-based authentication, and how to prepare your Express app for future scaling with tools like Redis, message queues, and containerization.',
        authorId: 'u1',
        excerpt: 'Scalable API design using Node.js and Express, with middleware and modular routing...',
        tags: ['Node.js', 'Express', 'Backend', 'API'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b15'),
        commentCount: 2,
        likes: 40,
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-02-11'),
        publishedAt: new Date('2024-02-10'),
    },
    {
        id: 'b16',
        title: 'Understanding React 18 Concurrent Mode',
        content:
            'React 18 introduces a powerful feature called Concurrent Mode, which allows React to interrupt rendering work to handle more urgent updates. This improves the responsiveness of the app by making rendering non-blocking. It includes features like automatic batching, startTransition, and Suspense improvements. Understanding how to properly use Concurrent Mode is essential for building performant modern apps.',
        authorId: 'u1',
        excerpt: 'React 18 introduces concurrent rendering for better performance...',
        tags: ['React', 'JavaScript', 'Frontend'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b16'),
        commentCount: 2,
        likes: 45,
        createdAt: new Date('2024-05-01'),
        updatedAt: new Date('2024-05-03'),
        publishedAt: new Date('2024-05-02'),
    },
    {
        id: 'b17',
        title: 'What’s New in TypeScript 5.5',
        content:
        'TypeScript 5.5 introduces several improvements, including enhanced type inference, new utility types, and faster incremental builds. It also fixes long-standing bugs related to type narrowing and inference across deeply nested structures. Developers can now benefit from more predictable type-checking and smarter autocompletion in their editors. The update also improves support for JSX and template literal types.',
        authorId: 'u2',
        excerpt: 'Explore the key features and improvements in TypeScript 5.5...',
        tags: ['TypeScript', 'JavaScript', 'Programming'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b17'),
        commentCount: 1,
        likes: 28,
        createdAt: new Date('2024-06-10'),
        updatedAt: new Date('2024-06-12'),
        publishedAt: new Date('2024-06-11'),
    },
    {
        id: 'b18',
        title: 'Mastering Tailwind CSS in Large Projects',
        content:
        'Tailwind CSS can become unwieldy in large-scale applications without proper structure. This post covers best practices such as using configuration presets, component extraction, and dark mode management. It also explores how to integrate Tailwind with utility-first design and atomic class organization. By following a scalable methodology, teams can maintain consistency and avoid bloated stylesheets.',
        authorId: 'u3',
        excerpt: 'Best practices for scalable Tailwind CSS setups...',
        tags: ['CSS', 'Tailwind', 'Frontend'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b18'),
        commentCount: 3,
        likes: 33,
        createdAt: new Date('2024-04-15'),
        updatedAt: new Date('2024-04-16'),
        publishedAt: new Date('2024-04-15'),
    },
    {
        id: 'b19',
        title: 'JWT vs OAuth2: Which Auth Method Should You Use?',
        content:
        'JWT (JSON Web Tokens) and OAuth2 are two common methods for handling authentication. JWT is simple, stateless, and widely used for token-based systems, whereas OAuth2 is more complex and better suited for delegated authorization across multiple services. This blog breaks down their core differences, pros and cons, and real-world use cases so developers can choose the right method for their project needs.',
        authorId: 'u1',
        excerpt: 'JWT and OAuth2 are popular auth methods, but they serve different needs...',
        tags: ['Authentication', 'Security', 'JWT', 'OAuth2'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b19'),
        commentCount: 4,
        likes: 51,
        createdAt: new Date('2024-03-20'),
        updatedAt: new Date('2024-03-22'),
        publishedAt: new Date('2024-03-21'),
    },
    {
        id: 'b20',
        title: 'Building Scalable APIs with Node.js and Express',
        content:
        'Building scalable APIs requires a well-structured backend architecture. In this post, we explore key principles using Node.js and Express such as modular routing, middleware composition, error handling, and request validation. We also cover rate limiting, token-based authentication, and how to prepare your Express app for future scaling with tools like Redis, message queues, and containerization.',
        authorId: 'u1',
        excerpt: 'Scalable API design using Node.js and Express, with middleware and modular routing...',
        tags: ['Node.js', 'Express', 'Backend', 'API'],
        isPublished: true,
        comments: mockComments.filter(c => c.blogId === 'b20'),
        commentCount: 2,
        likes: 40,
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-02-11'),
        publishedAt: new Date('2024-02-10'),
    }
];
