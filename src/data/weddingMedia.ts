import type { TranslationKey } from "../locales/locales";

export interface MediaResource {
  id: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  actionKey: TranslationKey;
  href: string;
}
interface WeddingMedia {
  photos: MediaResource[];
  videos: MediaResource[];
}

// Temporary links. Replace each href when the wedding album and film are ready.
const rickrollUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
export const weddingMedia: WeddingMedia = {
  photos: [
    {
      id: "album",
      titleKey: "photoAlbum",
      descriptionKey: "photoAlbumDescription",
      actionKey: "openPhotos",
      href: "https://drive.google.com/drive/folders/1TFV7yQAuQPaD8bh7msEiltTpRNqNVtEc?usp=sharing",
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
