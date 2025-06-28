import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { type Developer } from '../models/Developer';
import { Card } from '@mui/material';

const DeveloperProfilePage = () => {
    const { id } = useParams();
    const [developer, setDeveloper] = useState<Developer | null>(null);

    useEffect(() => {
        fetch(`/api/developers/${id}`)
        .then((res) => res.json())
        .then(setDeveloper);
    }, [id]);

    if (!developer) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto p-4">
        <Card className="p-6">
            <h1 className="text-2xl font-bold mb-2">{developer.name}</h1>
            <p className="mb-2 text-gray-600">{developer.bio}</p>
            <p className="text-sm">Skills: {developer.skills.join(', ')}</p>
            <a
            href={developer.github}
            className="text-blue-500 underline mt-4 inline-block"
            target="_blank"
            rel="noreferrer"
            >
            View GitHub
            </a>
        </Card>
        </div>
    );
};

export default DeveloperProfilePage;
