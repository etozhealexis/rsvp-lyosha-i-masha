import { useCallback, useEffect, useRef, useState } from "react";

export function useAudioPlayer() {
  const current = useRef<{ id: string; audio: HTMLAudioElement } | null>(null);
  const playRequest = useRef(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [duration, setDuration] = useState<Record<string, number>>({});
  const [hasError, setHasError] = useState(false);

  const handlePlayPause = useCallback((id: string, url: string) => {
    const request = ++playRequest.current;
    setHasError(false);
    let track = current.current;
    if (track?.id !== id) {
      if (track) {
        const previousId = track.id;
        track.audio.pause();
        track.audio.onended =
          track.audio.ontimeupdate =
          track.audio.onloadedmetadata =
          track.audio.onerror =
            null;
        setProgress((previous) => ({ ...previous, [previousId]: 0 }));
      }
      const audio = new Audio(url);
      track = { id, audio };
      current.current = track;
      audio.onloadedmetadata = () => {
        if (Number.isFinite(audio.duration))
          setDuration((previous) => ({ ...previous, [id]: audio.duration }));
      };
      audio.ontimeupdate = () => {
        if (Number.isFinite(audio.duration) && audio.duration > 0) {
          setProgress((previous) => ({
            ...previous,
            [id]: (audio.currentTime / audio.duration) * 100,
          }));
        }
      };
      audio.onended = () => {
        setPlayingId(null);
        setProgress((previous) => ({ ...previous, [id]: 0 }));
      };
      audio.onerror = () => {
        setHasError(true);
        setPlayingId(null);
      };
    } else if (!track.audio.paused) {
      track.audio.pause();
      setPlayingId(null);
      return;
    }
    const { audio } = track;
    setPlayingId(id);
    void audio.play().catch((error: unknown) => {
      if (current.current?.audio === audio && playRequest.current === request) {
        setPlayingId(null);
        if (!(error instanceof DOMException && error.name === "AbortError"))
          setHasError(true);
      }
    });
  }, []);

  const handleSeek = useCallback((id: string, value: number) => {
    const track = current.current;
    if (
      track?.id === id &&
      Number.isFinite(track.audio.duration) &&
      track.audio.duration > 0
    ) {
      track.audio.currentTime = (value / 100) * track.audio.duration;
      setProgress((previous) => ({ ...previous, [id]: value }));
    }
  }, []);

  useEffect(() => {
    const holder = current;
    const request = playRequest;
    return () => {
      request.current++;
      const track = holder.current;
      if (track) {
        track.audio.onended =
          track.audio.ontimeupdate =
          track.audio.onloadedmetadata =
          track.audio.onerror =
            null;
        track.audio.pause();
        holder.current = null;
      }
    };
  }, []);

  return {
    playingId,
    progress,
    duration,
    hasError,
    handlePlayPause,
    handleSeek,
  };
}
