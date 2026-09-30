import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  translations,
  type Language,
  type TranslationKey,
} from "../locales/locales";
import { LanguageContext } from "./language";

function readLanguage(): Language {
  try {
    return localStorage.getItem("language") === "sr" ? "sr" : "ru";
  } catch {
    return "ru";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(readLanguage);
  const changeLanguage = useCallback((next: Language) => {
    setLanguage(next);
    try {
      localStorage.setItem("language", next);
    } catch {
      // The current session still works when browser storage is unavailable.
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  const t = useCallback(
    (key: TranslationKey) => translations[language][key],
    [language],
  );
  const value = useMemo(
    () => ({ t, language, changeLanguage }),
    [t, language, changeLanguage],
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
