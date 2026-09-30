import React, { memo, useCallback, useState } from "react";
import { Box, Typography, IconButton, Slider } from "@mui/material";
import { MusicNote, Pause, PlayArrow } from "@mui/icons-material";
import { useTranslation } from "../../hooks/useTranslation";
import type { Song } from "../../data/music";

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const PlayPauseButton = memo(
  ({
    isPlaying,
    color,
    onClick,
  }: {
    isPlaying: boolean;
    color: string;
    onClick: (e: React.MouseEvent) => void;
  }) => {
    const { t } = useTranslation();
    return (
      <IconButton
        aria-label={isPlaying ? t("pause") : t("play")}
        onClick={onClick}
        sx={{
          width: 32,
          height: 32,
          bgcolor: isPlaying ? color : "transparent",
          color: isPlaying ? "white" : "#666",
          "&:hover": {
            bgcolor: isPlaying ? color : `${color}1A`,
          },
        }}
      >
        {isPlaying ? (
          <Pause sx={{ fontSize: 18 }} />
        ) : (
          <PlayArrow sx={{ fontSize: 18 }} />
        )}
      </IconButton>
    );
  },
);

const ProgressBar = memo(
  ({
    progress,
    color,
    onSeek,
  }: {
    progress: number;
    color: string;
    onSeek: (value: number) => void;
  }) => {
    const { t } = useTranslation();
    return (
      <Box sx={{ px: 2, pb: 1.5 }}>
        <Slider
          size="small"
          aria-label={t("playbackPosition")}
          value={progress}
          onChange={(_, value) =>
            onSeek(Array.isArray(value) ? (value[0] ?? 0) : value)
          }
          sx={{
            color: color,
            height: 4,
            "& .MuiSlider-thumb": {
              width: 10,
              height: 10,
            },
          }}
        />
      </Box>
    );
  },
);

export const SongItem = memo(
  ({
    id,
    song,
    color,
    isPlaying,
    progress,
    duration,
    onPlayPause,
    onSeek,
  }: {
    id: string;
    song: Song;
    color: string;
    isPlaying: boolean;
    progress: number;
    duration: number;
    onPlayPause: (id: string, url: string) => void;
    onSeek: (id: string, value: number) => void;
  }) => {
    const currentTime = (progress / 100) * duration;
    const [isHovered, setIsHovered] = useState(false);

    const handlePlayPauseClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onPlayPause(id, song.url);
      },
      [id, song.url, onPlayPause],
    );

    const handleSeek = useCallback(
      (value: number) => {
        onSeek(id, value);
      },
      [id, onSeek],
    );

    return (
      <Box sx={{ mb: 1 }}>
        <Box
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 1.5,
            px: 2,
            transition: "all 0.2s ease",
            backgroundColor: isHovered ? `${color}08` : "transparent",
            transform: isHovered ? "translateX(4px)" : "translateX(0)",
            cursor: "pointer",
            borderRadius: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                bgcolor: color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                transition: "transform 0.2s ease",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            >
              <MusicNote sx={{ fontSize: 16 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  transition: "color 0.2s ease",
                  color: isHovered ? color : "inherit",
                }}
              >
                {song.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {song.artist}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {(isPlaying || progress > 0) && duration > 0 && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ minWidth: 45 }}
              >
                {formatTime(currentTime)} / {formatTime(duration)}
              </Typography>
            )}
            <PlayPauseButton
              isPlaying={isPlaying}
              color={color}
              onClick={handlePlayPauseClick}
            />
          </Box>
        </Box>

        {(isPlaying || progress > 0) && (
          <ProgressBar progress={progress} color={color} onSeek={handleSeek} />
        )}
      </Box>
    );
  },
);
