import { Box, Typography } from "@mui/material";
import { useTranslation } from "../../hooks/useTranslation";
import { FlowerBackground } from "../common/FlowerBackground";
import { DressCodeCarousel } from "../DressCodeCarousel";

export function GiftsSection() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        alignItems: "stretch",
        my: 8,
        position: "relative",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <DressCodeCarousel title={t("dressInspiration")} />
      </Box>
      <Box sx={{ flex: 1, position: "relative" }}>
        <Box
          sx={{
            bgcolor: "#fff5e6",
            p: 4,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <FlowerBackground count={6} area="gifts" opacity={0.1} />

          <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3.5rem", md: "3.5rem" },
                fontWeight: 800,
                color: "#e41e71",
                letterSpacing: "0.05em",
              }}
            >
              {t("gifts")}
            </Typography>
            <br />
            <br />
            <Typography
              variant="h4"
              sx={{ fontWeight: 300, mb: 3, maxWidth: 500, mx: "auto" }}
            >
              {t("giftsDescription")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
