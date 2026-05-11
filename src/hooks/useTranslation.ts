import { useState, useCallback } from 'react';
import {type Language, type Translations, translations } from '../locales/locales';

export const useTranslation = () => {
    const [language, setLanguage] = useState<Language>('ru');

    const t = useCallback((key: keyof Translations): string => {
        return translations[language][key];
    }, [language]);

    const changeLanguage = useCallback((newLanguage: Language) => {
        setLanguage(newLanguage);
        // Сохраняем выбор языка в localStorage
        localStorage.setItem('language', newLanguage);
    }, []);

    // Загружаем сохраненный язык при инициализации
    useState(() => {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en')) {
            setLanguage(savedLanguage);
        }
    });

    return { t, language, changeLanguage };
};