import React from 'react';
import { Paper, Box, useMediaQuery } from '@mui/material';

interface PhotoSectionProps {
    src: string;
    alt: string;
}

export const PhotoSection: React.FC<PhotoSectionProps> = ({ src, alt }) => {
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <Paper
            elevation={3}
            sx={{
                mb: 4,
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Box sx={{ position: 'relative', height: isMobile ? 300 : 500 }}>
                <img
                    src={src}
                    alt={alt}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </Box>
        </Paper>
    );
};