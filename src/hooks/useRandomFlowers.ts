import {useMemo} from 'react';

interface Flower {
    id: number;
    color: string;
    size: number;
    rotate: number;
    variant: 'simple' | 'daisy' | 'rose' | 'tulip';
    top: string;
    left: string;
    right?: string;
    bottom?: string;
}

const colors = [
    '#F7DE50',
    '#EBA258',
    '#A4CCEE',
    '#AEB265',
    '#EAA0A7',
    '#99A0D9',
];

const variants: Array<'simple' | 'daisy' | 'rose' | 'tulip'> = [
    'simple', 'daisy', 'rose', 'tulip'
];

const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const useRandomFlowers = (count: number = 5, area: string = 'full') => {
    return useMemo(() => {
        const newFlowers: Flower[] = [];
        for (let i = 0; i < count; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = getRandomNumber(30, 80);
            const rotate = getRandomNumber(-45, 45);
            const variant = variants[Math.floor(Math.random() * variants.length)];

            // Позиции по всей странице - от 0 до 100% по высоте и ширине
            const top = `${getRandomNumber(0, 100)}%`;
            const left = `${getRandomNumber(0, 100)}%`;

            newFlowers.push({
                id: i,
                color,
                size,
                rotate,
                variant,
                top,
                left,
            });
        }
        return newFlowers;
    }, [count, area]);
};