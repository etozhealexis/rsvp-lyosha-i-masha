import React from 'react';
import { Box } from '@mui/material';

interface DecorativeFlowerProps {
    color: string;
    size?: number;
    rotate?: number;
    style?: React.CSSProperties;
    opacity?: number;
}

const DecorativeFlower: React.FC<DecorativeFlowerProps> = ({
                                                               color,
                                                               size = 40,
                                                               rotate = 0,
                                                               style = {},
                                                               opacity = 0.15,
                                                           }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                width: size,
                height: size,
                transform: `rotate(${rotate}deg)`,
                pointerEvents: 'none',
                opacity: opacity,
                zIndex: 0,
                ...style,
            }}
        >
            {/* 5 лепестков */}
            {[0, 72, 144, 216, 288].map((angle) => (
                <Box
                    key={angle}
                    sx={{
                        position: 'absolute',
                        width: '45%',
                        height: '45%',
                        backgroundColor: color,
                        borderRadius: '50%',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-60%)`,
                        opacity: 0.7,
                    }}
                />
            ))}
            {/* Сердцевина */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '30%',
                    height: '30%',
                    backgroundColor: '#ffd700',
                    borderRadius: '50%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                    opacity: 0.8,
                }}
            />
        </Box>
    );
};

export default DecorativeFlower;