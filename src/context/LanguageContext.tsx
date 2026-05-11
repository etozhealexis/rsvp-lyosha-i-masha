import React, { createContext, useContext, type ReactNode } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import type {Language, Translations} from '../locales/locales';

interface LanguageContextType {
    t: (key: keyof Translations) => string;
    language: Language;
    changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const translation = useTranslation();

    return (
        <LanguageContext.Provider value={translation}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};