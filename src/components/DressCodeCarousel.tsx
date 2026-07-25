import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import dressPhoto1 from '../assets/images/carousel/image-1.png';
import dressPhoto2 from '../assets/images/carousel/image-2.png';
import dressPhoto3 from '../assets/images/carousel/image-3.jpg';
import dressPhoto4 from '../assets/images/carousel/image-4.png';
import dressPhoto5 from '../assets/images/carousel/image-5.jpg';
import dressPhoto6 from '../assets/images/carousel/image-6.png';

interface DressCodeCarouselProps {
    title: string;
    language: 'ru' | 'sr';
}

const getImagesData = (language: 'ru' | 'sr') => [
    {
        url: dressPhoto1,
    },
    {
        url: dressPhoto2,
    },
    {
        url: dressPhoto3,
    },
    {
        url: dressPhoto4,
    },
    {
        url: dressPhoto5,
    },
    {
        url: dressPhoto6,
    }
];

export const DressCodeCarousel: React.FC<DressCodeCarouselProps> = ({ title, language }) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [currentIndex, setCurrentIndex] = useState(0);
    const imagesData = getImagesData(language);

    useEffect(() => {
        setCurrentIndex(0);
    }, [language]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? imagesData.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === imagesData.length - 1 ? 0 : prev + 1));
    };

    const currentImage = imagesData[currentIndex];

    return (
        <Box sx={{ py: 6, position: 'relative' }}>
            <Typography
                variant="h3"
                sx={{
                    textAlign: 'center',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    mb: 4,
                    position: 'relative',
                    display: 'inline-block',
                    width: '100%',
                }}
            >
                {title}
                <Box sx={{
                    position: 'absolute',
                    bottom: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 40,
                    height: 2,
                    bgcolor: '#e41e71'
                }} />
            </Typography>

            <Box sx={{
                position: 'relative',
                maxWidth: 600,
                mx: 'auto',
                px: 4,
            }}>
                {/* Изображение */}
                <Box
                    sx={{
                        position: 'relative',
                        borderRadius: 2,
                        overflow: 'hidden',
                        aspectRatio: '4/3',
                        backgroundColor: '#f5f5f5',
                    }}
                >
                    <img
                        src={currentImage.url}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </Box>

                {/* Навигация */}
                <IconButton
                    onClick={handlePrev}
                    sx={{
                        position: 'absolute',
                        left: 0,
                        top: '45%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    }}
                >
                    <ArrowBack />
                </IconButton>

                <IconButton
                    onClick={handleNext}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: '45%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    }}
                >
                    <ArrowForward />
                </IconButton>

                {/* Индикаторы */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1.5,
                        mt: 3,
                    }}
                >
                    {imagesData.map((_, index) => (
                        <Box
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                backgroundColor: index === currentIndex ? '#e41e71' : '#ccc',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                '&:hover': {
                                    backgroundColor: index === currentIndex ? '#e41e71' : '#999',
                                },
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};