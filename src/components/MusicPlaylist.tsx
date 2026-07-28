import React, {useState, useRef, useEffect, useCallback, memo} from 'react';
import {Box, Typography, IconButton, Collapse, Container, Slider} from '@mui/material';
import { PlayArrow, Pause, ExpandMore, MusicNote, Favorite, Audiotrack } from '@mui/icons-material';
import audioGroom1 from '../assets/audios/groom/noize_cvet.mp3';
import audioGroom2 from '../assets/audios/groom/shboom.mp3';
import audioGroom3 from '../assets/audios/groom/dont_be_sad.mp3';
import audioGroom4 from '../assets/audios/groom/warriors.mp3';
import audioGroom5 from '../assets/audios/groom/snowy.mp3';
import audioGroom6 from '../assets/audios/groom/blue_moon.mp3';
import audioGroom7 from '../assets/audios/groom/night.mp3';
import audioGroom8 from '../assets/audios/groom/where_is_my_mind.mp3';
import audioBride1 from '../assets/audios/bride/fall.mp3';
import audioBride2 from '../assets/audios/bride/upup.mp3';
import audioBride3 from '../assets/audios/bride/pray.mp3';
import audioBride4 from '../assets/audios/bride/death.mp3';
import audioBride5 from '../assets/audios/bride/teapot.mp3';
import audioBride6 from '../assets/audios/bride/love.mp3';
import audioBride7 from '../assets/audios/bride/august.mp3';
import audioBride8 from '../assets/audios/bride/seainside.mp3';

interface Song {
    id: number;
    title: string;
    artist: string;
    url: string;
}

interface MusicPlaylistProps {
    language: 'ru' | 'sr';
}

const groomSongs: Song[] = [
    { id: 1, title: 'Любимый цвет', artist: 'Noize MC', url: audioGroom1 },
    { id: 2, title: 'Sh-Boom', artist: 'The Chords', url: audioGroom2 },
    { id: 3, title: 'Не переживай', artist: 'Кружок Хора', url: audioGroom3 },
    { id: 4, title: 'Warriors', artist: 'Imagine Dragons', url: audioGroom4 },
    { id: 5, title: 'Снежная', artist: 'Soltwine', url: audioGroom5 },
    { id: 6, title: 'Blue Moon', artist: 'Frank Sinatra', url: audioGroom6 },
    { id: 7, title: 'Видели ночь', artist: 'Кино', url: audioGroom7 },
    { id: 8, title: 'Where is my mind', artist: 'Pixies', url: audioGroom8 }
];

const brideSongs: Song[] = [
    { id: 1, title: 'The Fall', artist: 'Imagine Dragons', url: audioBride1 },
    { id: 2, title: 'Up&Up', artist: 'Coldplay', url: audioBride2 },
    { id: 3, title: 'Pray For Me', artist: 'The Weeknd ft. Kendrick Lamar', url: audioBride3 },
    { id: 4, title: 'Death of a Bachelor', artist: 'Panic! At The Disco', url: audioBride4 },
    { id: 5, title: 'Ставь чайник', artist: 'Soltwine', url: audioBride5 },
    { id: 6, title: 'Всё ради любви', artist: 'L\'One', url: audioBride6 },
    { id: 7, title: 'Август', artist: 'Сироткин', url: audioBride7 },
    { id: 8, title: 'Моревнутри', artist: 'Ёлка', url: audioBride8 }
];

const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const PlayPauseButton = memo(({
                                  isPlaying,
                                  color,
                                  onClick
                              }: {
    isPlaying: boolean;
    color: string;
    onClick: (e: React.MouseEvent) => void;
}) => {
    return (
        <IconButton
            onClick={onClick}
            sx={{
                width: 32,
                height: 32,
                bgcolor: isPlaying ? color : 'transparent',
                color: isPlaying ? 'white' : '#666',
                '&:hover': {
                    bgcolor: isPlaying ? color : `${color}1A`,
                },
            }}
        >
            {isPlaying ? <Pause sx={{ fontSize: 18 }} /> : <PlayArrow sx={{ fontSize: 18 }} />}
        </IconButton>
    );
});

const ProgressBar = memo(({
                              progress,
                              color,
                              onSeek
                          }: {
    progress: number;
    color: string;
    onSeek: (value: number) => void;
}) => {
    return (
        <Box sx={{ px: 2, pb: 1.5 }}>
            <Slider
                size="small"
                value={progress}
                onChange={(_, value) => onSeek(value as number)}
                sx={{
                    color: color,
                    height: 4,
                    '& .MuiSlider-thumb': {
                        width: 10,
                        height: 10,
                    },
                }}
            />
        </Box>
    );
});

const SongItem = memo(({
                           id,
                           song,
                           color,
                           isPlaying,
                           progress,
                           duration,
                           onPlayPause,
                           onSeek
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

    const handlePlayPauseClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        onPlayPause(id, song.url);
    }, [id, song.url, onPlayPause]);

    const handleSeek = useCallback((value: number) => {
        onSeek(id, value);
    }, [id, onSeek]);

    return (
        <Box sx={{ mb: 1 }}>
            <Box
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 1.5,
                    px: 2,
                    transition: 'all 0.2s ease',
                    backgroundColor: isHovered ? `${color}08` : 'transparent',
                    transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                    cursor: 'pointer',
                    borderRadius: 1,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            bgcolor: color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            transition: 'transform 0.2s ease',
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        }}
                    >
                        <MusicNote sx={{ fontSize: 16 }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 500,
                                transition: 'color 0.2s ease',
                                color: isHovered ? color : 'inherit',
                            }}
                        >
                            {song.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {song.artist}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {(isPlaying || progress > 0) && duration > 0 && (
                        <Typography variant="caption" color="text.secondary" sx={{ minWidth: 45 }}>
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </Typography>
                    )}
                    <PlayPauseButton isPlaying={isPlaying} color={color} onClick={handlePlayPauseClick} />
                </Box>
            </Box>

            {(isPlaying || progress > 0) && (
                <ProgressBar progress={progress} color={color} onSeek={handleSeek} />
            )}
        </Box>
    );
});

export const MusicPlaylist: React.FC<MusicPlaylistProps> = ({ language }) => {
    const [expandedGroom, setExpandedGroom] = useState(true);
    const [expandedBride, setExpandedBride] = useState(true);

    const [playingId, setPlayingId] = useState<string | null>(null);
    const [progress, setProgress] = useState<{ [key: string]: number }>({});
    const [duration, setDuration] = useState<{ [key: string]: number }>({});

    const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
    const intervalRefs = useRef<{ [key: string]: ReturnType<typeof setTimeout> }>({});

    const pauseSong = useCallback((id: string) => {
        if (audioRefs.current[id]) {
            audioRefs.current[id]?.pause();
        }
        if (intervalRefs.current[id]) {
            clearInterval(intervalRefs.current[id]);
            delete intervalRefs.current[id];
        }
        setPlayingId(null);
        // Не сбрасываем прогресс!
    }, []);

    const stopSong = useCallback((id: string) => {
        if (audioRefs.current[id]) {
            audioRefs.current[id]?.pause();
            audioRefs.current[id]!.currentTime = 0;
        }
        if (intervalRefs.current[id]) {
            clearInterval(intervalRefs.current[id]);
            delete intervalRefs.current[id];
        }
        if (playingId === id) {
            setPlayingId(null);
        }
        setProgress(prev => ({ ...prev, [id]: 0 }));
    }, [playingId]);

    // В функции playSong
    const playSong = useCallback((id: string, url: string) => {
        // Останавливаем текущую песню
        if (playingId && playingId !== id) {
            stopSong(playingId);
        }

        let audio = audioRefs.current[id];

        if (!audio) {
            // Создаём новый аудио элемент
            const newAudio = new Audio(url);

            // Добавляем слушатель события
            newAudio.addEventListener('loadedmetadata', () => {
                // Проверяем, что аудио существует и имеет длительность
                if (newAudio && newAudio.duration && isFinite(newAudio.duration)) {
                    setDuration(prev => ({ ...prev, [id]: newAudio.duration }));
                }
            });

            // Добавляем слушатель окончания
            newAudio.addEventListener('ended', () => {
                stopSong(id);
            });

            audioRefs.current[id] = newAudio;
            audio = newAudio;
        }

        // Теперь audio точно существует, но TypeScript может не знать об этом
        // Добавляем проверку на всякий случай
        if (!audio) {
            return;
        }

        // Если песня уже была на паузе и есть прогресс
        if (progress[id] > 0 && progress[id] < 99) {
            // Продолжаем с того же места
        } else {
            // Начинаем с начала
            audio.currentTime = 0;
            setProgress(prev => ({ ...prev, [id]: 0 }));
        }

        audio.play();
        setPlayingId(id);

        // Очищаем старый интервал
        if (intervalRefs.current[id]) {
            clearInterval(intervalRefs.current[id]);
        }

        // Запускаем новый интервал
        intervalRefs.current[id] = setInterval(() => {
            if (audio && !audio.paused && audio.duration) {
                const newProgress = (audio.currentTime / audio.duration) * 100;
                setProgress(prev => ({ ...prev, [id]: newProgress }));

                if (audio.currentTime >= audio.duration) {
                    stopSong(id);
                }
            }
        }, 100);
    }, [playingId, stopSong, progress]);

    const handlePlayPause = useCallback((id: string, url: string) => {
        if (playingId === id) {
            // Пауза - останавливаем, но не сбрасываем прогресс
            pauseSong(id);
        } else {
            // Плей - воспроизводим (с сохранением прогресса)
            playSong(id, url);
        }
    }, [playingId, pauseSong, playSong]);

    const handleSeek = useCallback((id: string, value: number) => {
        const audio = audioRefs.current[id];
        const dur = duration[id];

        if (audio && dur) {
            const newTime = (value / 100) * dur;
            audio.currentTime = newTime;
            setProgress(prev => ({ ...prev, [id]: value }));

            // Если песня не играет, просто обновляем прогресс
            if (playingId !== id) {
                // Не воспроизводим автоматически
            }
        }
    }, [duration, playingId]);

    // Cleanup
    useEffect(() => {
        return () => {
            Object.keys(audioRefs.current).forEach(id => {
                if (audioRefs.current[id]) {
                    audioRefs.current[id]?.pause();
                    audioRefs.current[id] = null;
                }
            });
            Object.keys(intervalRefs.current).forEach(id => {
                clearInterval(intervalRefs.current[id]);
            });
        };
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 8, position: 'relative' }}>
            <Typography
                variant="h3"
                sx={{
                    textAlign: 'center',
                    fontWeight: 700,
                    mb: 2,
                    width: '100%',
                }}
            >
                {language === 'ru' ? 'Радио Окно и Сауна, 11.04FM' : 'Радио Прозор и Сауна, 11.04 ФМ'}
            </Typography>
            <Typography
                variant="h4"
                color="text.secondary"
                sx={{
                    textAlign: 'center',
                    mb: 6
                }}
            >
                {language === 'ru'
                    ? '· DJs MaRussia и Alexis собрали свои любимые треки ·'
                    : '· DJs MaRussia и Alexis су за вас припремили своје омиљене нумере ·'}
            </Typography>

            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4,
            }}>
                {/* Плейлист жениха */}
                <Box sx={{ flex: 1 }}>
                    <Box
                        onClick={() => setExpandedGroom(!expandedGroom)}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            mb: 2,
                            pb: 1,
                            borderBottom: '2px solid #ffb40f',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                opacity: 0.8,
                                transform: 'translateX(4px)',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Favorite sx={{ color: '#ffb40f' }} />
                            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                DJ Alexis
                            </Typography>
                        </Box>
                        <IconButton sx={{ transform: expandedGroom ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                            <ExpandMore />
                        </IconButton>
                    </Box>

                    <Collapse in={expandedGroom}>
                        <Box sx={{
                            bgcolor: 'rgba(235, 162, 88, 0.03)',
                            borderRadius: 2,
                            overflow: 'hidden',
                        }}>
                            {groomSongs.map((song) => {
                                const id = `groom-${song.id}`;
                                return (
                                    <SongItem
                                        key={id}
                                        id={id}
                                        song={song}
                                        color="#ffb40f"
                                        isPlaying={playingId === id}
                                        progress={progress[id] || 0}
                                        duration={duration[id] || 0}
                                        onPlayPause={handlePlayPause}
                                        onSeek={handleSeek}
                                    />
                                );
                            })}
                        </Box>
                    </Collapse>
                </Box>

                {/* Плейлист невесты */}
                <Box sx={{ flex: 1 }}>
                    <Box
                        onClick={() => setExpandedBride(!expandedGroom)}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            mb: 2,
                            pb: 1,
                            borderBottom: '2px solid #ffb40f',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                opacity: 0.8,
                                transform: 'translateX(4px)',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Audiotrack sx={{ color: '#e41e71' }} />
                            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                DJ MaRussia
                            </Typography>
                        </Box>
                        <IconButton sx={{ transform: expandedBride ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                            <ExpandMore />
                        </IconButton>
                    </Box>

                    <Collapse in={expandedBride}>
                        <Box sx={{
                            bgcolor: 'rgba(228,30,113,0.03)',
                            borderRadius: 2,
                            overflow: 'hidden',
                        }}>
                            {brideSongs.map((song) => {
                                const id = `bride-${song.id}`;
                                return (
                                    <SongItem
                                        key={id}
                                        id={id}
                                        song={song}
                                        color="#e41e71"
                                        isPlaying={playingId === id}
                                        progress={progress[id] || 0}
                                        duration={duration[id] || 0}
                                        onPlayPause={handlePlayPause}
                                        onSeek={handleSeek}
                                    />
                                );
                            })}
                        </Box>
                    </Collapse>
                </Box>
            </Box>
        </Container>
    );
};