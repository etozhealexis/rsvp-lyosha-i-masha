import React from 'react';
import { Box, Typography } from '@mui/material';

interface ColorPaletteProps {
    language: 'ru' | 'sr';
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ language }) => {
    const colors = [
        { color: '#F7DE50' },
        { color: '#E89D57' },
        { color: '#A4CCEE' },
        { color: '#AEB265' },
        { color: '#EAA0A7' },
        { color: '#99A0D9' },
    ];

    return (
        <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, letterSpacing: '0.05em' }}>
                {language === 'ru' ? 'Наше торжество будет оформлено в такой палитре:'
                    : 'Наше славље ће бити организовано у одабраној палети боја:'}
            </Typography>

            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center',
                mb: 3,
            }}>
                {colors.map((color, idx) => (
                    <Box key={idx} sx={{ textAlign: 'center', width: 80 }}>
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                background: color.color,
                                transform: `rotate(${[0, 5, -3, 8, -5, 2][idx]}deg)`,
                                transition: 'all 0.3s',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                                position: 'relative',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '10%',
                                    left: '25%',
                                    width: '30%',
                                    height: '15%',
                                    background: 'radial-gradient(ellipse, rgba(255,255,255,0.4) 0%, transparent 100%)',
                                    borderRadius: '50%',
                                    transform: 'rotate(-20deg)',
                                },
                                '&:hover': {
                                    transform: `rotate(${[0, 5, -3, 8, -5, 2][idx]}deg) scale(1.05)`,
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                                },
                            }}
                        />
                    </Box>
                ))}
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 300, mb: 3, letterSpacing: '0.04em' }}>
                {language === 'ru' ? 'При желании, можете поддержать цветовую гамму в своих нарядах.'
                    : 'Уколико желите, можете ускладити своју одевну комбинацију са нашом колоритном темом.'}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 300, mb: 3, letterSpacing: '0.04em' }}>
                {language === 'ru' ? 'Если хотите надеть что-то посветлее, потемнее, поярче, в цветочек или полосочку - всё можно. Давайте устроим разноцветный праздник!'
                    : 'Ако, пак, више волите нешто светлије, тамније, упечатљивије, са цветним или пругастим дезеном – све је добродошло. Нека наша прослава буде шарена, весела и незаборавна!'}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 300, mb: 3, letterSpacing: '0.04em' }}>
                {language === 'ru' ? 'Просим избегать чёрный, бордовый, красный и белый цвета.'
                    : 'Љубазно вас молимо да избегавате одећу у црној, црвеној, бордо и белој боји.'}
            </Typography>
        </Box>
    );
};

export default ColorPalette;