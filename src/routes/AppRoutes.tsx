import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const DeveloperDirectory = lazy(() => import('../pages/DeveloperDirectory'));
const DeveloperProfilePage = lazy(() => import('../pages/DeveloperProfilePage'));
const Blog = lazy(() => import('../pages/Blog'));
const NewBlog = lazy(() => import('../pages/NewBlog'));

const AppRoutes = () => {
    return (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/developers" element={<DeveloperDirectory />} />
        <Route path="/developers/:id" element={<DeveloperProfilePage />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/blogs/new" element={<ProtectedRoute><NewBlog /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;