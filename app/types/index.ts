type ArtistSummary = {
  _id: string;
  name: string;
};

type Artist = {
  _id: string;
  name: string;
  description: string;
  photoUrl: string;
  songs: Song[];
  albums: Album[];
  __v: number;
};

type Song = {
  _id: string;
  title: string;
  artist: ArtistSummary; 
  album: string;
  year: number;
  genre: string;
  songFileUrl: string;
  __v: number;
};

type Album = {
  _id: string;
  title: string;
  artist: ArtistSummary; 
  releaseDate: string;
  genre: string;
  albumCoverUrl: string;
  songs: Song[];
  __v: number; 
};

type Playlist = {
  _id: string;
  name: string;
  description: string;
  user: string;
  songs: Song[];
  __v: number; 
}

export type { Song, Album, Artist, ArtistSummary, Playlist };