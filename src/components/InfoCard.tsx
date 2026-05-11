import React, { type ReactNode } from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import type { InfoItem } from '../data/content';

interface InfoCardProps {
    icon: ReactNode;
    title: string;
    items: InfoItem[];
    accentColor: string;
    columns?: 1 | 2 | 3 | 4; // количество колонок для сетки
}

export const InfoCard: React.FC<InfoCardProps> = ({
                                                      icon,
                                                      title,
                                                      items,
                                                      accentColor,
                                                      columns = 2
                                                  }) => {
    // Определяем ширину колонки в зависимости от количества колонок
    const getGridSize = () => {
        switch (columns) {
            case 1: return { xs: 12 };
            case 2: return { xs: 12, sm: 6 };
            case 3: return { xs: 12, sm: 6, md: 4 };
            case 4: return { xs: 12, sm: 6, md: 3 };
            default: return { xs: 12, sm: 6 };
        }
    };

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
                    <Box sx={{ color: accentColor }}>{icon}</Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    {items.map((item, idx) => (
                        <Grid size={getGridSize()} key={idx}>  {/* ← Меняем item {...size} на size={size} */}
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
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
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