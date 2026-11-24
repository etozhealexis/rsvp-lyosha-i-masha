import { Box, Typography } from "@mui/material";
import { ArrowOutward, DownloadOutlined } from "@mui/icons-material";
import type { MediaResource } from "../data/weddingMedia";
import { useTranslation } from "../hooks/useTranslation";
import { ExternalLink } from "./common/ExternalLink";

export function PhotoDownloadCard({ resource }: { resource: MediaResource }) {
  const { t } = useTranslation();
  return (
    <Box
      component="section"
      aria-labelledby={`download-${resource.id}`}
      sx={{
        p: { xs: 3, md: 4 },
        bgcolor: "#f7e8ec",
        border: "1px solid #ecd0d8",
        borderRadius: 3,
        display: "flex",
        alignItems: "flex-start",
        gap: { xs: 2, md: 3 },
      }}
    >
      <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", justifyContent: "center", flexShrink: 0, width: 56, height: 56, bgcolor: "#fffaf7", borderRadius: "50%", color: "#a71650" }}>
        <DownloadOutlined sx={{ fontSize: 30 }} />
      </Box>
      <Box>
        <Typography component="p" sx={{ color: "#a71650", fontSize: "1.2rem", mb: 1 }}>
          {t("originalQuality")}
        </Typography>
        <Typography id={`download-${resource.id}`} variant="h3" component="h2" sx={{ mb: 1.5 }}>
          {t(resource.titleKey)}
        </Typography>
        <Typography variant="h5" component="p" sx={{ maxWidth: 720, mb: 3 }}>
          {t(resource.descriptionKey)}
        </Typography>
        <ExternalLink
          href={resource.href}
          underline="none"
          sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: { xs: 2, sm: 3 }, py: 1.25, borderRadius: 2, bgcolor: "#a71650", color: "white", fontSize: "1.4rem", "&:hover": { bgcolor: "#85113f" }, "&:focus-visible": { outline: "3px solid #a71650", outlineOffset: 3 } }}
        >
          {t(resource.actionKey)}
          <ArrowOutward fontSize="small" />
        </ExternalLink>
      </Box>
    </Box>
  );
}
