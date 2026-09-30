import { Alert, Box, Container, Typography } from "@mui/material";
import { Audiotrack, Favorite } from "@mui/icons-material";
import { brideSongs, groomSongs } from "../data/music";
import { useTranslation } from "../hooks/useTranslation";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { PlaylistGroup } from "./music/PlaylistGroup";

export function MusicPlaylist() {
  const { t } = useTranslation();
  const player = useAudioPlayer();
  return (
    <Container maxWidth="lg" sx={{ py: 8, position: "relative" }}>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", fontWeight: 700, mb: 2 }}
      >
        {t("radioTitle")}
      </Typography>
      <Typography
        variant="h4"
        color="text.secondary"
        sx={{ textAlign: "center", mb: 6 }}
      >
        {t("radioDescription")}
      </Typography>
      {player.hasError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {t("audioError")}
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <PlaylistGroup
          id="groom"
          title={t("djGroom")}
          color="#ffb40f"
          icon={<Favorite />}
          songs={groomSongs}
          player={player}
        />
        <PlaylistGroup
          id="bride"
          title={t("djBride")}
          color="#e41e71"
          icon={<Audiotrack />}
          songs={brideSongs}
          player={player}
        />
      </Box>
    </Container>
  );
}
