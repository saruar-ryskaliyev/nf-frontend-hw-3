'use client';

import { useMusicPlayer } from '../context/MusicPlayerContext';
import { Song } from '../types';

interface FavoritesPageProps {
  favorites: Song[];
}

const FavoritesPage = ({ favorites }: FavoritesPageProps) => {
  const { setSong } = useMusicPlayer();

  if (!favorites || favorites.length === 0) {
    return <div>No favorites found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-8">Favorites</h1>

      <div className="bg-black text-white rounded-lg p-4">
        <div className="flex justify-between border-b border-gray-700 pb-2 mb-2">
          <span>#</span>
          <span className="flex-1 text-left pl-8">Title</span>
          <span>Artist</span>
        </div>
        {favorites.map((song: Song, index: number) => (
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
            <span>{song.artist.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
