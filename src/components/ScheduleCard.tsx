import React from 'react';
import { Card, CardContent, Box, Typography, Grid } from '@mui/material';
import { Schedule } from '@mui/icons-material';
import type {ScheduleItem} from '../data/content';

interface ScheduleCardProps {
    title: string;
    items: ScheduleItem[];
    accentColor: string;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ title, items, accentColor }) => {
    return (
        <Card
            sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                },
            }}
        >
            <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Schedule sx={{ fontSize: 40, color: accentColor }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    {items.map((item, idx) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: 'rgba(0,0,0,0.02)',
                                    height: '100%',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        bgcolor: 'rgba(0,0,0,0.04)',
                                        transform: 'translateX(4px)',
                                    }
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: accentColor,
                                        mb: 1,
                                    }}
                                >
                                    {item.time}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};