import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "../../hooks/useTranslation";
import {
  FloatingImage,
  OffsetBox,
  RotatedBox,
} from "../common/DecorativeLayout";
import { ExternalLink } from "../common/ExternalLink";
import japan from "../../assets/images/our-photos/japan.png";

export function InvitationSection() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, py: 8 }}>
      <Box sx={{ position: "relative" }}>
        <FloatingImage
          sx={{
            position: "absolute",
            bottom: { xs: "-10%", md: "-10%" },
            left: { xs: "-5%", md: "-5%" },
            width: { xs: "100px", md: "150px" },
            height: { xs: "100px", md: "150px" },
            transform: { xs: "rotate(-12deg)", md: "rotate(-12deg)" },
            zIndex: 0,
            opacity: { xs: 0.8, md: 0.8 },
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <Box
            component="img"
            src={japan}
            alt=""
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: { xs: "12px", md: "20px" },
              display: "block",
            }}
          />
        </FloatingImage>

        <OffsetBox sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: "2rem",
              maxWidth: "70%",
              pl: 3,
              textAlign: "center",
              fontWeight: 400,
            }}
          >
            {t("invitationGreeting")}
          </Typography>
        </OffsetBox>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <RotatedBox sx={{ transform: "rotate(-4deg)", mt: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {t("invitationWhen")}
            </Typography>
            <br />
            <Typography
              variant="h2"
              sx={{ fontSize: "3rem", fontWeight: 800, color: "#e41e71" }}
            >
              {t("weddingDateLong")}
            </Typography>
          </RotatedBox>

          <RotatedBox
            sx={{
              transform: "rotate(2deg)",
              bgcolor: "#ffb40f",
              p: 6,
              width: { xs: "100%", md: "auto" },
              mt: { xs: 4, md: 0 },
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {t("invitationWhere")}
            </Typography>
            <br />
            <Typography variant="h4" sx={{ maxWidth: 300 }}>
              {t("invitationPlaceDescription")}
              <ExternalLink
                href="https://yandex.ru/maps/-/CTb1iGiV"
                color="#e41e71"
              >
                {t("venue")}
              </ExternalLink>
            </Typography>
          </RotatedBox>
        </Box>
      </Box>
    </Container>
  );
}
