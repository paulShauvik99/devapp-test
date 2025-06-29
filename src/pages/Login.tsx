import { useForm } from 'react-hook-form';
import { TextField, Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../features/auth/authSlice';

interface FormData {
    email: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: { email: string }) => {
    try {
        const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });

        if (!response.ok) {
        throw new Error('Login failed');
        }

        const result = await response.json();
        dispatch(setCredentials(result)); 
        navigate('/');
    } catch (error) {
        console.error(error);
    }
    };


    return (
        <div className="flex justify-center items-center h-screen">
        <Card className="p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField label="Email" fullWidth {...register('email')} />
            <TextField label="Password" type="password" fullWidth {...register('password')} />
            <Button type="submit" variant="contained" fullWidth>Login</Button>
            </form>
        </Card>
        </div>
    );
};

export default Login;