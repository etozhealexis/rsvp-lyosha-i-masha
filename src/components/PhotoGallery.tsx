import { useEffect, useRef, useState } from "react";
import { Box, Dialog, IconButton, Slider, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import photos from "../data/photoGallery.json";
import { useTranslation } from "../hooks/useTranslation";

const mobileStripHeight = "clamp(220px, 50svh, 420px)";

export function PhotoGallery() {
  const { t } = useTranslation();
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[number] | null>(null);
  const closePreview = () => setSelectedPhoto(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const handleWheel = (event: WheelEvent) => {
      // Keep pinch-to-zoom and normal page scrolling at either end of the strip.
      if (event.ctrlKey) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? strip.clientWidth : 1;
      const nextLeft = Math.max(0, Math.min(
        strip.scrollWidth - strip.clientWidth,
        strip.scrollLeft + delta * unit,
      ));
      if (Math.abs(nextLeft - strip.scrollLeft) < 1) return;
      event.preventDefault();
      strip.scrollLeft = nextLeft;
    };

    const syncPosition = () => {
      const max = strip.scrollWidth - strip.clientWidth;
      setScrollPosition(max > 0 ? Math.max(0, Math.min(100, strip.scrollLeft / max * 100)) : 0);
    };
    const resizeObserver = new ResizeObserver(syncPosition);
    resizeObserver.observe(strip);
    const frame = requestAnimationFrame(syncPosition);
    strip.addEventListener("scroll", syncPosition, { passive: true });
    strip.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      strip.removeEventListener("scroll", syncPosition);
      strip.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <Box
      component="section"
      aria-labelledby="gallery-heading"
      sx={{ mt: { xs: 5, md: 7 }, pt: { xs: 4, md: 5 }, borderTop: "1px solid #dfd5c7" }}
    >
      <Typography component="p" sx={{ display: "inline-block", px: 1.5, py: 0.5, mb: 1.5, borderRadius: 2, bgcolor: "#eaf0e4", color: "#536345", fontSize: "1.2rem" }}>
        {t("galleryLabel")}
      </Typography>
      <Typography id="gallery-heading" variant="h3" component="h2" sx={{ mb: 1.5 }}>
        {t("galleryTitle")}
      </Typography>
      <Typography variant="h5" component="p" sx={{ maxWidth: 800, mb: 3 }}>
        {t("galleryDescription")}
      </Typography>
      <Box
        ref={stripRef}
        role="group"
        aria-label={t("photosTitle")}
        tabIndex={0}
        sx={{
          display: "flex",
          gap: 2,
          height: { xs: mobileStripHeight, sm: "clamp(240px, 65svh, 640px)" },
          overflowX: "auto",
          overflowY: "hidden",
          p: 0.5,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          "&:focus-visible": { outline: "3px solid #a71650", outlineOffset: 3 },
        }}
      >
        {photos.map((photo, index) => (
          <Box
            component="button"
            type="button"
            key={photo.src}
            onClick={() => setSelectedPhoto(photo)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "0 0 auto",
              width: { xs: "100%", sm: "auto" },
              height: "100%",
              aspectRatio: { xs: "auto", sm: `${photo.width} / ${photo.height}` },
              p: 0,
              border: 0,
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: { xs: "transparent", sm: "#eadfd0" },
              cursor: "zoom-in",
              "&:focus-visible": { outline: "3px solid #a71650", outlineOffset: 3 },
            }}
          >
            <Box
              component="img"
              src={`${import.meta.env.BASE_URL}${photo.src}`}
              alt={`${t("weddingPhoto")} ${index + 1}`}
              width={photo.width}
              height={photo.height}
              loading={index < 3 ? "eager" : "lazy"}
              decoding="async"
              sx={{
                display: "block",
                width: {
                  xs: `min(100%, calc((${mobileStripHeight} - 8px) * ${photo.width / photo.height}))`,
                  sm: "auto",
                },
                height: { xs: "auto", sm: "100%" },
                aspectRatio: `${photo.width} / ${photo.height}`,
                maxWidth: { xs: "100%", sm: "none" },
                maxHeight: "100%",
                borderRadius: 2,
              }}
            />
          </Box>
        ))}
      </Box>
      <Slider
        aria-label={t("scrollPhotos")}
        value={scrollPosition}
        min={0}
        max={100}
        step={0.01}
        onChange={(_, value) => {
          const strip = stripRef.current;
          if (!strip || typeof value !== "number") return;
          strip.scrollLeft = (strip.scrollWidth - strip.clientWidth) * value / 100;
          setScrollPosition(value);
        }}
        sx={{
          color: "#a71650",
          width: "calc(100% - 40px)",
          mx: 2.5,
          mt: 1,
          height: 6,
          "& .MuiSlider-thumb": { width: 40, height: 12, borderRadius: 2 },
          "& .MuiSlider-rail": { opacity: 0.2 },
        }}
      />
      <Dialog
        open={selectedPhoto !== null}
        onClose={closePreview}
        slotProps={{ paper: { "aria-label": t("weddingPhoto") } }}
        maxWidth={false}
        sx={{
          "& .MuiBackdrop-root": { bgcolor: "rgba(0,0,0,0.88)" },
          "& .MuiDialog-paper": {
            m: 2,
            width: "calc(100% - 32px)",
            maxWidth: 1400,
            bgcolor: "transparent",
            boxShadow: "none",
            overflow: "visible",
          },
        }}
      >
        {selectedPhoto && (
          <Box
            component="img"
            src={`${import.meta.env.BASE_URL}${selectedPhoto.src}`}
            alt={t("weddingPhoto")}
            width={selectedPhoto.width}
            height={selectedPhoto.height}
            sx={{ display: "block", width: "100%", height: "calc(100dvh - 96px)", objectFit: "contain" }}
          />
        )}
        <IconButton
          aria-label={t("close")}
          onClick={closePreview}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            color: "white",
            bgcolor: "rgba(0,0,0,0.6)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.85)" },
          }}
        >
          <Close />
        </IconButton>
      </Dialog>
    </Box>
  );
}
