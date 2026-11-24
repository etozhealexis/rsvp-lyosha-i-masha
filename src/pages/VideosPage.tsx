import { Typography } from "@mui/material";
import { useTranslation } from "../hooks/useTranslation";
import { weddingMedia } from "../data/weddingMedia";
import { MediaCard } from "../components/common/MediaCard";
import { MediaPageLayout } from "../components/common/MediaPageLayout";

export function VideosPage() {
  const { t } = useTranslation();
  return (
    <MediaPageLayout titleKey="videosPageTitle" descriptionKey="videosDescription">
      {weddingMedia.videos.map((resource) => <MediaCard key={resource.id} resource={resource} />)}
      {weddingMedia.videos.length === 0 && <Typography variant="h5">{t("mediaSoon")}</Typography>}
    </MediaPageLayout>
  );
}
