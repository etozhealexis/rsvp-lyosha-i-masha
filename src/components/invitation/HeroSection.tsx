import { Box, Typography } from "@mui/material";
import { useTranslation } from "../../hooks/useTranslation";
import { FloatingImage, OffsetBox } from "../common/DecorativeLayout";
import paris from "../../assets/images/our-photos/paris.png";
import carcassone from "../../assets/images/our-photos/carcassone.png";

export function HeroSection() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <FloatingImage
        sx={{
          position: "absolute",
          top: { xs: "5%", md: "10%" },
          right: { xs: "-5%", md: "-5%" },
          width: { xs: "150px", md: "300px" },
          height: { xs: "150px", md: "300px" },
          transform: { xs: "rotate(10deg)", md: "rotate(15deg)" },
          opacity: { xs: 0.3, md: 0.3 },
          zIndex: 0,
          display: { xs: "block", md: "block" },
          pointerEvents: "none",
        }}
      >
        <Box
          component="img"
          src={paris}
          alt=""
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: { xs: "12px", md: "20px" },
          }}
        />
      </FloatingImage>

      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          fontSize: { xs: "8rem", md: "18rem" },
          fontWeight: 700,
          color: "rgba(228,30,113,0.08)",
          transform: "rotate(-15deg)",
          top: { xs: "10%", md: "5%" },
          left: { xs: "-1%", md: "-1%" },
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        26.09
      </Typography>
      <FloatingImage
        sx={{
          position: "absolute",
          bottom: { xs: "5%", md: "15%" },
          left: { xs: "5%", md: "10%" },
          width: { xs: "110px", md: "180px" },
          height: { xs: "110px", md: "180px" },
          transform: { xs: "rotate(-8deg)", md: "rotate(-8deg)" },
          zIndex: 3,
          borderRadius: "50%",
          overflow: "hidden",
          border: { xs: "2px solid white", md: "4px solid white" },
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          display: { xs: "block", md: "block" },
        }}
      >
        <Box
          component="img"
          src={carcassone}
          alt=""
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </FloatingImage>

      <Box sx={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <Box sx={{ position: "relative", display: "inline-block", mb: 3 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "3rem", md: "6rem" },
              fontWeight: 800,
              background: "linear-gradient(135deg, #e41e71, #ffb40f)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              lineHeight: 2,
              paddingTop: "0.1em",
              paddingBottom: "0.1em",
              display: "inline-block",
            }}
          >
            {t("weddingDate")}
          </Typography>
        </Box>

        <OffsetBox sx={{ ml: { md: 8 } }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2rem", md: "3.5rem" }, fontWeight: 500 }}
          >
            {t("couple")}
          </Typography>
        </OffsetBox>
      </Box>
    </Box>
  );
}
