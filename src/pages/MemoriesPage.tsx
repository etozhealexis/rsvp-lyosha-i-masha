import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "../hooks/useTranslation";
import { weddingMedia } from "../data/weddingMedia";
import { MediaCard } from "../components/common/MediaCard";

export function MemoriesPage() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 9 } }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h5" component="p" sx={{ color: "#a71650", mb: 2 }}>
          {t("couple")} · {t("weddingDate")}
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "3.2rem", md: "5rem" },
            fontWeight: 700,
            mb: 3,
          }}
        >
          {t("memoriesTitle")}
        </Typography>
        <Typography
          variant="h4"
          component="p"
          sx={{ maxWidth: 740, mx: "auto" }}
        >
          {t("memoriesDescription")}
        </Typography>
      </Box>
      <Box component="section" aria-labelledby="photos-heading" sx={{ mb: 7 }}>
        <Typography
          id="photos-heading"
          variant="h3"
          component="h2"
          sx={{ mb: 3 }}
        >
          {t("photosTitle")}
        </Typography>
        <Box sx={{ display: "grid", gap: 3 }}>
          {weddingMedia.photos.map((resource) => (
            <MediaCard key={resource.id} resource={resource} />
          ))}
          {weddingMedia.photos.length === 0 && (
            <Typography variant="h5">{t("mediaSoon")}</Typography>
          )}
        </Box>
      </Box>
      <Box component="section" aria-labelledby="videos-heading">
        <Typography
          id="videos-heading"
          variant="h3"
          component="h2"
          sx={{ mb: 3 }}
        >
          {t("videosTitle")}
        </Typography>
        <Box sx={{ display: "grid", gap: 3 }}>
          {weddingMedia.videos.map((resource) => (
            <MediaCard key={resource.id} resource={resource} />
          ))}
          {weddingMedia.videos.length === 0 && (
            <Typography variant="h5">{t("mediaSoon")}</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
