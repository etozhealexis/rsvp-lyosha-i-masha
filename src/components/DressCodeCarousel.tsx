import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useTranslation } from "../hooks/useTranslation";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import dressPhoto1 from "../assets/images/carousel/image-1.webp";
import dressPhoto2 from "../assets/images/carousel/image-2.webp";
import dressPhoto3 from "../assets/images/carousel/image-3.webp";
import dressPhoto4 from "../assets/images/carousel/image-4.webp";
import dressPhoto5 from "../assets/images/carousel/image-5.webp";
import dressPhoto6 from "../assets/images/carousel/image-6.webp";

interface DressCodeCarouselProps {
  title: string;
}

const imagesData = [
  {
    url: dressPhoto1,
  },
  {
    url: dressPhoto2,
  },
  {
    url: dressPhoto3,
  },
  {
    url: dressPhoto4,
  },
  {
    url: dressPhoto5,
  },
  {
    url: dressPhoto6,
  },
];

export const DressCodeCarousel: React.FC<DressCodeCarouselProps> = ({
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imagesData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imagesData.length - 1 ? 0 : prev + 1));
  };

  const currentImage = imagesData[currentIndex] ?? imagesData[0];
  if (!currentImage) return null;

  return (
    <Box sx={{ py: 6, position: "relative" }}>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          letterSpacing: "0.1em",
          mb: 4,
          position: "relative",
          display: "inline-block",
          width: "100%",
        }}
      >
        {title}
        <Box
          sx={{
            position: "absolute",
            bottom: -10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 40,
            height: 2,
            bgcolor: "#e41e71",
          }}
        />
      </Typography>

      <Box
        sx={{
          position: "relative",
          maxWidth: 600,
          mx: "auto",
          px: 4,
        }}
      >
        {/* Изображение */}
        <Box
          sx={{
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
            aspectRatio: "4/3",
            backgroundColor: "#f5f5f5",
          }}
        >
          <img
            src={currentImage.url}
            alt={`${title} — ${currentIndex + 1}`}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Навигация */}
        <IconButton
          aria-label={t("previousPhoto")}
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: 0,
            top: "45%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.8)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <ArrowBack />
        </IconButton>

        <IconButton
          aria-label={t("nextPhoto")}
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: 0,
            top: "45%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.8)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <ArrowForward />
        </IconButton>

        {/* Индикаторы */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1.5,
            mt: 3,
          }}
        >
          {imagesData.map((_, index) => (
            <Box
              key={index}
              component="button"
              type="button"
              aria-label={`${t("selectPhoto")} ${index + 1}`}
              aria-pressed={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: 24,
                height: 24,
                border: 0,
                borderRadius: "50%",
                backgroundColor: index === currentIndex ? "#e41e71" : "#ccc",
                cursor: "pointer",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: index === currentIndex ? "#e41e71" : "#999",
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
