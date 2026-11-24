import type { ReactNode } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "../../hooks/useTranslation";
import type { TranslationKey } from "../../locales/locales";

export function MediaPageLayout({ titleKey, descriptionKey, children }: {
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  children: ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 9 } }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h5" component="p" sx={{ color: "#a71650", mb: 2 }}>
          {t("couple")} · {t("weddingDate")}
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: "3.2rem", md: "5rem" }, fontWeight: 700, mb: 3 }}>
          {t(titleKey)}
        </Typography>
        <Typography variant="h4" component="p" sx={{ maxWidth: 740, mx: "auto" }}>
          {t(descriptionKey)}
        </Typography>
      </Box>
      {children}
    </Container>
  );
}
