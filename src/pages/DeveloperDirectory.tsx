import React, { useEffect, useState } from 'react';
import { type Developer } from '../models/User';
import { Card, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const DeveloperDirectory = () => {
    const [developers, setDevelopers] = useState<Developer[]>([]);

    useEffect(() => {
        fetch('/api/developers')
        .then((res) => res.json())
        .then(setDevelopers);
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Developer Directory</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {developers.map((dev) => (
            <Card key={dev.id} className="p-4">
                <h2 className="text-lg font-semibold">{dev.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{dev.bio}</p>
                <p className="text-sm mb-2">Skills: {dev.skills.join(', ')}</p>
                <Button component={Link} to={`/developers/${dev.id}`} variant="outlined" size="small">
                View Profile
                </Button>
            </Card>
            ))}
        </div>
        </div>
    );
};

export default DeveloperDirectory;