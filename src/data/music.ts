import audioGroom1 from "../assets/audios/groom/noize_cvet.mp3";
import audioGroom2 from "../assets/audios/groom/shboom.mp3";
import audioGroom3 from "../assets/audios/groom/dont_be_sad.mp3";
import audioGroom4 from "../assets/audios/groom/warriors.mp3";
import audioGroom5 from "../assets/audios/groom/snowy.mp3";
import audioGroom6 from "../assets/audios/groom/blue_moon.mp3";
import audioGroom7 from "../assets/audios/groom/night.mp3";
import audioGroom8 from "../assets/audios/groom/where_is_my_mind.mp3";
import audioBride1 from "../assets/audios/bride/fall.mp3";
import audioBride2 from "../assets/audios/bride/upup.mp3";
import audioBride3 from "../assets/audios/bride/pray.mp3";
import audioBride4 from "../assets/audios/bride/death.mp3";
import audioBride5 from "../assets/audios/bride/teapot.mp3";
import audioBride6 from "../assets/audios/bride/love.mp3";
import audioBride7 from "../assets/audios/bride/august.mp3";
import audioBride8 from "../assets/audios/bride/seainside.mp3";

export interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
}

export const groomSongs: Song[] = [
  { id: 1, title: "Любимый цвет", artist: "Noize MC", url: audioGroom1 },
  { id: 2, title: "Sh-Boom", artist: "The Chords", url: audioGroom2 },
  { id: 3, title: "Не переживай", artist: "Кружок Хора", url: audioGroom3 },
  { id: 4, title: "Warriors", artist: "Imagine Dragons", url: audioGroom4 },
  { id: 5, title: "Снежная", artist: "Soltwine", url: audioGroom5 },
  { id: 6, title: "Blue Moon", artist: "Frank Sinatra", url: audioGroom6 },
  { id: 7, title: "Видели ночь", artist: "Кино", url: audioGroom7 },
  { id: 8, title: "Where is my mind", artist: "Pixies", url: audioGroom8 },
];

export const brideSongs: Song[] = [
  { id: 1, title: "The Fall", artist: "Imagine Dragons", url: audioBride1 },
  { id: 2, title: "Up&Up", artist: "Coldplay", url: audioBride2 },
  {
    id: 3,
    title: "Pray For Me",
    artist: "The Weeknd ft. Kendrick Lamar",
    url: audioBride3,
  },
  {
    id: 4,
    title: "Death of a Bachelor",
    artist: "Panic! At The Disco",
    url: audioBride4,
  },
  { id: 5, title: "Ставь чайник", artist: "Soltwine", url: audioBride5 },
  { id: 6, title: "Всё ради любви", artist: "L'One", url: audioBride6 },
  { id: 7, title: "Август", artist: "Сироткин", url: audioBride7 },
  { id: 8, title: "Моревнутри", artist: "Ёлка", url: audioBride8 },
];
