import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <h1 className="text-4xl font-bold mb-6">Welcome to DevHub</h1>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-300 text-center max-w-lg">
            Explore developers, write blogs, and connect with the community.
        </p>
        <Link to="/developers" className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
            Get Started
        </Link>
        </div>
    );
};

export default Home;