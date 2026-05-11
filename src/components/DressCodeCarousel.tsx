import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, useMediaQuery, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

import dressPhoto1 from '../assets/images/alina.jpg';
import dressPhoto2 from '../assets/images/simon.jpeg';

interface DressCodeCarouselProps {
    title: string;
    language: 'ru' | 'en'; // принимаем язык как prop
}

const getImagesData = (language: 'ru' | 'en') => [
    {
        url: dressPhoto1,
        caption: language === 'ru' ? 'Элегантное вечернее платье' : 'Elegant Evening Gown',
        description: language === 'ru'
            ? 'Платье в пол с изысканными деталями'
            : 'Floor-length gown with sophisticated details',
    },
    {
        url: dressPhoto2,
        caption: language === 'ru' ? 'Классический костюм' : 'Formal Suit',
        description: language === 'ru'
            ? 'Идеально сидящий костюм с галстуком или бабочкой'
            : 'Well-tailored suit with tie or bow tie',
    },
    {
        url: '/images/dress-3.jpg',
        caption: language === 'ru' ? 'Коктейльное платье' : 'Cocktail Dress',
        description: language === 'ru'
            ? 'Элегантное коктейльное платье до колена'
            : 'Elegant knee-length cocktail dress',
    },
    {
        url: '/images/dress-4.jpg',
        caption: language === 'ru' ? 'Вечерние аксессуары' : 'Evening Accessories',
        description: language === 'ru'
            ? 'Клатч, украшения и элегантные туфли'
            : 'Clutch, jewelry, and elegant heels',
    },
];

export const DressCodeCarousel: React.FC<DressCodeCarouselProps> = ({ title, language }) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [currentIndex, setCurrentIndex] = useState(0);
    const imagesData = getImagesData(language);

    // Сбрасываем индекс при смене языка
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
        <Card elevation={10} sx={{ borderRadius: 4, mb: 4, overflow: 'hidden' }}>
            <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
                    {language === 'ru' ? 'Примеры образов для вдохновения' : 'Style inspiration examples'}
                </Typography>

                <Box sx={{ position: 'relative' }}>
                    <Box
                        sx={{
                            position: 'relative',
                            borderRadius: 2,
                            overflow: 'hidden',
                            height: isMobile ? 300 : 450,
                        }}
                    >
                        <img
                            src={currentImage.url}
                            alt={currentImage.caption}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                                color: 'white',
                                p: 3,
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {currentImage.caption}
                            </Typography>
                            <Typography variant="body2">
                                {currentImage.description}
                            </Typography>
                        </Box>
                    </Box>

                    <IconButton
                        onClick={handlePrev}
                        sx={{
                            position: 'absolute',
                            left: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                            zIndex: 1,
                        }}
                    >
                        <ArrowBack />
                    </IconButton>

                    <IconButton
                        onClick={handleNext}
                        sx={{
                            position: 'absolute',
                            right: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                            zIndex: 1,
                        }}
                    >
                        <ArrowForward />
                    </IconButton>

                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: 1,
                            zIndex: 1,
                        }}
                    >
                        {imagesData.map((_, index) => (
                            <Box
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: index === currentIndex ? '#667eea' : 'rgba(255,255,255,0.5)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        backgroundColor: index === currentIndex ? '#667eea' : 'rgba(255,255,255,0.8)',
                                    },
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                {!isMobile && (
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            mt: 2,
                            overflowX: 'auto',
                            '&::-webkit-scrollbar': {
                                height: 8,
                            },
                            '&::-webkit-scrollbar-track': {
                                background: '#f1f1f1',
                                borderRadius: 4,
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: '#667eea',
                                borderRadius: 4,
                            },
                        }}
                    >
                        {imagesData.map((image, index) => (
                            <Box
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                sx={{
                                    flex: '0 0 auto',
                                    width: 100,
                                    height: 70,
                                    borderRadius: 1,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    border: index === currentIndex ? '2px solid #667eea' : '2px solid transparent',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <img
                                    src={image.url}
                                    alt={`thumb-${index}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                )}

                <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block', textAlign: 'center' }}>
                    {language === 'ru'
                        ? '* Фотографии носят ознакомительный характер и служат для вдохновения'
                        : '* Photos are for inspiration purposes only'}
                </Typography>
            </CardContent>
        </Card>
    );
};