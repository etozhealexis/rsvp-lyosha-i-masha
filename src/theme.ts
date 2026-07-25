import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#667eea',
            light: '#7c8ef0',
            dark: '#5a67d8',
        },
        secondary: {
            main: '#764ba2',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: '"Verveine", "CranberryJam", "Roboto", "Helvetica", "Arial", sans-serif',
        h3: {
            fontSize: '2.5rem',
            '@media (max-width:600px)': {
                fontSize: '2rem',
            },
        },
    },
    shape: {
        borderRadius: 12,
    },
});