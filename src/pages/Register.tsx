import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { setCredentials } from '../features/auth/authSlice';

interface FormData {
    name: string;
    email: string;
    password: string;
}

const Register = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error('Registration failed');
        }

        const result = await res.json();
        dispatch(setCredentials(result));
        navigate('/');
        } catch (error) {
        console.error('Error during registration:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
        <Card className="p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField label="Name" fullWidth {...register('name')} />
            <TextField label="Email" fullWidth {...register('email')} />
            <TextField label="Password" type="password" fullWidth {...register('password')} />
            <Button type="submit" variant="contained" fullWidth>Register</Button>
            </form>
        </Card>
        </div>
    );
};

export default Register;
