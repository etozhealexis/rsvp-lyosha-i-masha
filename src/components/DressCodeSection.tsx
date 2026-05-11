import React from 'react';
import { Card, CardContent, Box, Typography, Grid, Chip } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

interface DressCodeColor {
    name: string;
    code: string;
    hex: string;
}

interface DressCodeSectionProps {
    title: string;
    description: string;
    colors: DressCodeColor[];
    chips: string[];
    accentColor: string;
}

export const DressCodeSection: React.FC<DressCodeSectionProps> = ({
                                                                      title,
                                                                      description,
                                                                      colors,
                                                                      chips,
                                                                      accentColor,
                                                                  }) => {
    return (
        <Card
            elevation={10}
            sx={{
                borderRadius: 4,
                mb: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <PersonAdd sx={{ fontSize: 32, color: accentColor, mr: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                </Box>

                <Typography variant="body1" sx={{ mb: 3 }}>
                    {description}
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                    {colors.map((color) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={color.name}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    p: 1,
                                    borderRadius: 2,
                                    bgcolor: 'white',
                                    boxShadow: 1,
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'scale(1.05)' },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 2,
                                        bgcolor: color.code,
                                        boxShadow: 1,
                                    }}
                                />
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        {color.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {color.hex}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                <Box
                    sx={{
                        mt: 2,
                        p: 2,
                        background: `linear-gradient(90deg, ${colors[0].code}, ${colors[1].code}, ${colors[3].code}, ${colors[5].code})`,
                        borderRadius: 2,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        justifyContent: 'center',
                    }}
                >
                    {chips.map((chip, idx) => (
                        <Chip
                            key={idx}
                            label={chip}
                            sx={{ backgroundColor: 'rgba(255,255,255,0.9)', fontWeight: 'bold' }}
                        />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};