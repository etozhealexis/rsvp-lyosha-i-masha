import React from 'react';
import { Paper, Typography, Avatar } from '@mui/material';
import { Celebration } from '@mui/icons-material';

interface HeroSectionProps {
    weddingTitle: string;
    coupleName: string;
    location: string;
    accentColor: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
                                                            weddingTitle,
                                                            coupleName,
                                                            location,
                                                            accentColor,
                                                        }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                mb: 4,
                textAlign: 'center',
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Avatar
                sx={{
                    width: 80,
                    height: 80,
                    background: `linear-gradient(135deg, ${accentColor}, ${accentColor})`,
                    margin: '0 auto 16px',
                }}
            >
                <Celebration sx={{ fontSize: 48 }} />
            </Avatar>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                {weddingTitle}
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
                {coupleName}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                {location}
            </Typography>
        </Paper>
    );
};