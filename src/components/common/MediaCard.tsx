import { Box, Typography } from "@mui/material";
import { ArrowOutward } from "@mui/icons-material";
import { useTranslation } from "../../hooks/useTranslation";
import type { MediaResource } from "../../data/weddingMedia";
import { ExternalLink } from "./ExternalLink";

export function MediaCard({ resource }: { resource: MediaResource }) {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        bgcolor: "rgba(255,255,255,0.85)",
        borderRadius: 3,
        border: "1px solid #eadfd0",
      }}
    >
      <Typography variant="h4" component="h3" gutterBottom>
        {t(resource.titleKey)}
      </Typography>
      <Typography variant="h5" component="p" sx={{ mb: 3 }}>
        {t(resource.descriptionKey)}
      </Typography>
      <ExternalLink
        href={resource.href}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          color: "#a71650",
          fontSize: "1.5rem",
        }}
      >
        {t(resource.actionKey)}
        <ArrowOutward fontSize="small" />
      </ExternalLink>
    </Box>
  );
}
