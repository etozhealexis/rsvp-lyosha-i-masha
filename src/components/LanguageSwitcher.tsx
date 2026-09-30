import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from "../hooks/useTranslation";
import type { Language } from "../locales/locales";

export function LanguageSwitcher() {
  const { t, language, changeLanguage } = useTranslation();
  return (
    <ToggleButtonGroup
      size="small"
      value={language}
      exclusive
      onChange={(_, value: Language | null) => {
        if (value) changeLanguage(value);
      }}
      aria-label={t("language")}
    >
      <ToggleButton value="ru" aria-label={t("russian")}>
        {t("ruShort")}
      </ToggleButton>
      <ToggleButton value="sr" aria-label={t("serbian")}>
        {t("srShort")}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
