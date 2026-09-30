import React from "react";
import { PaletteBubble } from "./PaletteBubble";
import type { TranslationKey } from "../locales/locales";
import { useTranslation } from "../hooks/useTranslation";
import { Box, Typography } from "@mui/material";

const ColorPalette: React.FC = () => {
  const { t } = useTranslation();
  const colors: { color: string; name: TranslationKey }[] = [
    { color: "#F7DE50", name: "paletteYellow" },
    { color: "#E89D57", name: "palettePeach" },
    { color: "#A4CCEE", name: "paletteBlue" },
    { color: "#AEB265", name: "paletteOlive" },
    { color: "#EAA0A7", name: "palettePink" },
    { color: "#99A0D9", name: "paletteLavender" },
  ];

  return (
    <Box sx={{ flex: 1 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 3, letterSpacing: "0.05em" }}
      >
        {t("paletteTitle")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          mb: 3,
        }}
      >
        {colors.map(({ color, name }) => (
          <PaletteBubble
            key={color}
            color={color}
            label={`${t("popColor")}: ${t(name)}`}
          />
        ))}
      </Box>

      <Typography
        variant="h5"
        sx={{ fontWeight: 300, mb: 3, letterSpacing: "0.04em" }}
      >
        {t("paletteInvitation")}
      </Typography>
      <Typography
        variant="h5"
        sx={{ fontWeight: 300, mb: 3, letterSpacing: "0.04em" }}
      >
        {t("paletteFreedom")}
      </Typography>
      <Typography
        variant="h4"
        sx={{ fontWeight: 300, mb: 3, letterSpacing: "0.04em" }}
      >
        {t("paletteAvoid")}
      </Typography>
    </Box>
  );
};

export default ColorPalette;
