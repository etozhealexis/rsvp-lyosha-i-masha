import { createContext } from "react";
import type { Language, Translate } from "../locales/locales";

export interface LanguageContextValue {
  t: Translate;
  language: Language;
  changeLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);
