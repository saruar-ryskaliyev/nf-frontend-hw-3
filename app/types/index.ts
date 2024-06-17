type Song = {
  _id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  songFileUrl: string;
  __v: number;
};

type Album = {
  _id: string;
  title: string;
  artist: {
    _id: string;
    name: string;
    description: string;
    photoUrl: string;
    songs: string[];
    __v: number;
  };
  releaseDate: string;
  genre: string;
  albumCoverUrl: string;
  songs: Song[];
  __v: number;
};

type Artist = {
  _id: string;
  name: string;
  description: string;
  photoUrl: string;
  songs: Song[];
  __v: number;
};

export type { Song, Album, Artist };