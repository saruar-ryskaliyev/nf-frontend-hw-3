'use client'

import { Playlist, Song } from '../types';
import { useMusicPlayer } from '../context/MusicPlayerContext';

export interface PlaylistPageProps {
  playlist: Playlist;
}

const PlaylistPage = ({ playlist }: PlaylistPageProps) => {
  const { setSong } = useMusicPlayer();

  if (!playlist) {
    return <div>No playlist found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-8">{playlist.name}</h1>
      <p className="text-xl mb-4">{playlist.description}</p>
      
      <h2 className="text-2xl font-bold mb-4">Songs</h2>
      
      <div className="bg-black text-white rounded-lg p-4">
        <div className="flex justify-between border-b border-gray-700 pb-2 mb-2">
          <span>#</span>
          <span className="flex-1 text-left pl-8">Title</span>
        </div>
        {playlist.songs.map((song: Song, index: number) => (
          <div
            key={song._id}
            className="flex justify-between items-center py-2 hover:bg-gray-800 rounded cursor-pointer"
            onClick={() => setSong(song.songFileUrl, song.title, song.artist.name)}
          >
            <span className="w-8">{index + 1}</span>
            <div className="flex-1 text-left pl-8">
              <p className="text-white">{song.title}</p>
              <p className="text-gray-400 text-sm">{song.artist.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
