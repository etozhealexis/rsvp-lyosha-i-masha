import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "../../hooks/useTranslation";
import { RotatedBox } from "../common/DecorativeLayout";
import ColorPalette from "../ColorPalette";

export function ScheduleSection() {
  const { t } = useTranslation();
  const schedule = [
    { time: "16:00", title: t("scheduleArrival") },
    { time: "16:45", title: t("scheduleCeremony") },
    { time: "17:30", title: t("scheduleDinner") },
    { time: "22:00", title: t("scheduleEnd") },
    { time: "23:00", title: t("scheduleTransfer") },
  ];
  return (
    <Container maxWidth="lg" sx={{ py: 8, position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 8 },
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ flex: 2 }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "left",
              mb: 6,
              position: "relative",
              fontWeight: 700,
            }}
          >
            {t("schedule")}
            <Box
              sx={{
                position: "absolute",
                bottom: -10,
                left: 0,
                width: 60,
                height: 2,
                bgcolor: "#e41e71",
              }}
            />
          </Typography>

          <Box sx={{ position: "relative" }}>
            {schedule.map((item, idx) => (
              <RotatedBox
                key={idx}
                sx={{
                  transform: {
                    xs: "rotate(0deg)",
                    md: `rotate(${[-2, 1, -1, 2][idx % 4]}deg)`,
                  },
                  ml: { md: `${[-20, 30, -10, 40][idx % 4]}px` },
                  mb: 4,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "baseline",
                  gap: 2,
                  borderBottom: "1px solid #eee",
                  pb: 2,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "3rem",
                    fontWeight: 800,
                    color: "#e41e71",
                    minWidth: 120,
                  }}
                >
                  {item.time}
                </Typography>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 500 }}>
                    {item.title}
                  </Typography>
                </Box>
              </RotatedBox>
            ))}
          </Box>
        </Box>
        <ColorPalette />
      </Box>
    </Container>
  );
}
