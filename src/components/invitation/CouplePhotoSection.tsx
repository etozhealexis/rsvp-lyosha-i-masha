import { Box, Container } from "@mui/material";
import { useTranslation } from "../../hooks/useTranslation";
import { FloatingImage } from "../common/DecorativeLayout";
import cute from "../../assets/images/our-photos/cute.webp";
import china from "../../assets/images/our-photos/china.webp";

export function CouplePhotoSection() {
  const { t } = useTranslation();
  return (
    <Container
      maxWidth="md"
      sx={{ py: 4, textAlign: "center", position: "relative" }}
    >
      <FloatingImage
        sx={{
          position: "absolute",
          top: { xs: "-30%", md: "-20%" },
          right: { xs: "5%", md: "5%" },
          width: { xs: "100px", md: "120px" },
          height: { xs: "100px", md: "120px" },
          transform: { xs: "rotate(15deg)", md: "rotate(25deg)" },
          zIndex: 1,
          opacity: { xs: 1, md: 1 },
          display: { xs: "block", md: "block" },
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <Box
          component="img"
          src={cute}
          alt=""
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: { xs: "10px", md: "15px" },
            display: "block",
          }}
        />
      </FloatingImage>

      <Box
        component="img"
        src={china}
        alt={t("couple")}
        sx={{
          width: "100%",
          maxWidth: 400,
          height: "auto",
          borderRadius: "50%",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          position: "relative",
          zIndex: 2,
        }}
      />
    </Container>
  );
}
