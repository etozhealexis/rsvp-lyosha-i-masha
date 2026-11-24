import { Typography } from "@mui/material";
import { useTranslation } from "../hooks/useTranslation";
import { weddingMedia } from "../data/weddingMedia";
import { PhotoDownloadCard } from "../components/PhotoDownloadCard";
import { MediaPageLayout } from "../components/common/MediaPageLayout";
import { PhotoGallery } from "../components/PhotoGallery";

export function PhotosPage() {
  const { t } = useTranslation();
  return (
    <MediaPageLayout titleKey="memoriesTitle" descriptionKey="photosDescription">
      {weddingMedia.photos.map((resource) => <PhotoDownloadCard key={resource.id} resource={resource} />)}
      {weddingMedia.photos.length === 0 && <Typography variant="h5">{t("mediaSoon")}</Typography>}
      <PhotoGallery />
    </MediaPageLayout>
  );
}
