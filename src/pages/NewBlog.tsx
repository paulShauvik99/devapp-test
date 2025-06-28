import { useForm } from 'react-hook-form';
import { TextField, Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface BlogForm {
    title: string;
    content: string;
}

const NewBlog = () => {
    const { register, handleSubmit } = useForm<BlogForm>();
    const navigate = useNavigate();

    const onSubmit = async (data: BlogForm) => {
        const res = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({
            ...data,
            createdAt: new Date().toISOString(),
        }),
        });
        const result = await res.json();
        navigate(`/blogs/${result.id}`);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
        <Card className="p-6">
            <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField label="Title" fullWidth {...register('title')} />
            <TextField label="Content" fullWidth multiline rows={6} {...register('content')} />
            <Button type="submit" variant="contained" color="primary">
                Publish
            </Button>
            </form>
        </Card>
        </div>
    );
};

export default NewBlog;
