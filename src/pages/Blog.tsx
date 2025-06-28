import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { type Blog } from '../models/Blog';

const BlogPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        fetch(`/api/blogs/${id}`)
        .then((res) => res.json())
        .then(setBlog);
    }, [id]);

    if (!blog) return <p className="text-center mt-10">Loading blog...</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-sm text-gray-500 mb-6">By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}</p>
        <div className="prose dark:prose-invert max-w-none">
            {blog.content}
        </div>
        </div>
    );
};

export default BlogPage;