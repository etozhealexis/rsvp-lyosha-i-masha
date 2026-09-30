import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "../../hooks/useTranslation";
import { FloatingImage } from "../common/DecorativeLayout";
import { ExternalLink } from "../common/ExternalLink";
import { RSVPForm } from "../RSVPForm";
import kaliningrad from "../../assets/images/our-photos/kaliningrad.png";

export function ResponseSection() {
  const { t } = useTranslation();
  return (
    <Container
      maxWidth="sm"
      sx={{ py: 8, textAlign: "center", position: "relative" }}
    >
      <FloatingImage
        sx={{
          position: "absolute",
          bottom: { xs: "1%", md: "-5%" },
          right: { xs: "1%", md: "-5%" },
          width: { xs: "80px", md: "100px" },
          height: { xs: "80px", md: "100px" },
          transform: { xs: "rotate(-5deg)", md: "rotate(-5deg)" },
          zIndex: 0,
          opacity: { xs: 0.8, md: 0.8 },
          display: { xs: "block", md: "block" },
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <Box
          component="img"
          src={kaliningrad}
          alt=""
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: { xs: "8px", md: "10px" },
            display: "block",
          }}
        />
      </FloatingImage>

      <Typography variant="h4" sx={{ mb: 4, fontWeight: 300 }}>
        {t("organizerHelp")}
        <br />
        {t("organizerContact")}
        <br />
        <ExternalLink
          href="https://t.me/korotina_v"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#24a1de", textDecoration: "underline" }}
        >
          {t("telegram")}
        </ExternalLink>
        ,&nbsp;
        <ExternalLink
          href="https://wa.me/79516734737"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#25d366", textDecoration: "underline" }}
        >
          {t("whatsApp")}
        </ExternalLink>
      </Typography>
      <RSVPForm />
    </Container>
  );
}
