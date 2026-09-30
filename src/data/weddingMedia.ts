import china from "../assets/images/our-photos/china.png";
import paris from "../assets/images/our-photos/paris.png";
import japan from "../assets/images/our-photos/japan.png";
import type { TranslationKey } from "../locales/locales";

interface PhotoPreview {
  id: string;
  src: string;
  altKey: TranslationKey;
}
export interface MediaResource {
  id: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  actionKey: TranslationKey;
  href: string;
}
interface WeddingMedia {
  isPlaceholder: boolean;
  previews: PhotoPreview[];
  photos: MediaResource[];
  videos: MediaResource[];
}

// Temporary links requested by the couple. Replace these and the previews with wedding materials.
const rickrollUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
export const weddingMedia: WeddingMedia = {
  isPlaceholder: true,
  previews: [
    { id: "china", src: china, altKey: "previewAlt" },
    { id: "paris", src: paris, altKey: "previewAlt" },
    { id: "japan", src: japan, altKey: "previewAlt" },
  ],
  photos: [
    {
      id: "album",
      titleKey: "photoAlbum",
      descriptionKey: "photoAlbumDescription",
      actionKey: "openPhotos",
      href: rickrollUrl,
    },
  ],
  videos: [
    {
      id: "film",
      titleKey: "weddingVideo",
      descriptionKey: "weddingVideoDescription",
      actionKey: "openVideo",
      href: rickrollUrl,
    },
  ],
};
