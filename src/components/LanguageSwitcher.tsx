import React from 'react';
import { ToggleButton, ToggleButtonGroup, Box, Paper } from '@mui/material';
import type {Language} from '../locales/locales';

interface LanguageSwitcherProps {
    language: Language;
    onLanguageChange: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
                                                                      language,
                                                                      onLanguageChange,
                                                                  }) => {
    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newLanguage: Language | null
    ) => {
        if (newLanguage !== null) {
            onLanguageChange(newLanguage);
            // Принудительно обновляем все компоненты через localStorage событие
            localStorage.setItem('language', newLanguage);
            window.dispatchEvent(new Event('storage'));
        }
    };

    return (
        <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
            <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <ToggleButtonGroup
                    value={language}
                    exclusive
                    onChange={handleChange}
                    aria-label="language selector"
                >
                    <ToggleButton
                        value="ru"
                        aria-label="russian"
                        sx={{
                            px: 2,
                            py: 1,
                            '&.Mui-selected': {
                                backgroundColor: '#667eea',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#5a67d8',
                                },
                            },
                        }}
                    >
                        🇷🇺 RU
                    </ToggleButton>
                    <ToggleButton
                        value="en"
                        aria-label="english"
                        sx={{
                            px: 2,
                            py: 1,
                            '&.Mui-selected': {
                                backgroundColor: '#667eea',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#5a67d8',
                                },
                            },
                        }}
                    >
                        🇬🇧 EN
                    </ToggleButton>
                </ToggleButtonGroup>
            </Paper>
        </Box>
    );
};