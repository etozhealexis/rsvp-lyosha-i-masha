import { useState, type ReactNode } from "react";
import { Box, ButtonBase, Collapse, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import type { Song } from "../../data/music";
import type { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { SongItem } from "./SongItem";

interface PlaylistGroupProps {
  id: string;
  title: string;
  color: string;
  icon: ReactNode;
  songs: Song[];
  player: ReturnType<typeof useAudioPlayer>;
}

export function PlaylistGroup({
  id,
  title,
  color,
  icon,
  songs,
  player,
}: PlaylistGroupProps) {
  const [expanded, setExpanded] = useState(true);
  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <ButtonBase
        onClick={() => setExpanded((previous) => !previous)}
        aria-expanded={expanded}
        aria-controls={`${id}-songs`}
        sx={{
          width: "100%",
          justifyContent: "space-between",
          mb: 2,
          pb: 1,
          borderBottom: `2px solid ${color}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color }}>
          {icon}
          <Typography variant="h6" color="text.primary">
            {title}
          </Typography>
        </Box>
        <ExpandMore
          sx={{
            transform: expanded ? "rotate(180deg)" : "none",
            transition: "transform 0.3s",
          }}
        />
      </ButtonBase>
      <Collapse in={expanded} id={`${id}-songs`} inert={!expanded}>
        <Box
          sx={{ bgcolor: `${color}08`, borderRadius: 2, overflow: "hidden" }}
        >
          {songs.map((song) => {
            const songId = `${id}-${song.id}`;
            return (
              <SongItem
                key={songId}
                id={songId}
                song={song}
                color={color}
                isPlaying={player.playingId === songId}
                progress={player.progress[songId] ?? 0}
                duration={player.duration[songId] ?? 0}
                onPlayPause={player.handlePlayPause}
                onSeek={player.handleSeek}
              />
            );
          })}
        </Box>
      </Collapse>
    </Box>
  );
}
