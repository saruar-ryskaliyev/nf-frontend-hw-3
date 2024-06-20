'use client'

import { Album } from '../types'; // Import the Album type
import { useMusicPlayer } from '../context/MusicPlayerContext';
import Image from 'next/image';

export interface AlbumPageProps {
  album: Album;
}

const AlbumPage = ({ album }: AlbumPageProps) => {
  const { setSong } = useMusicPlayer();

  if (!album) {
    return <div>No album found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-8">{album.title}</h1>
      <Image src={album.albumCoverUrl} alt={album.title} className="w-80 h-80 object-cover mx-auto mb-8" />
      <p className="text-xl mb-4 font-bold">{album.artist.name}</p>
      <p className="text-xl mb-4">{album.genre}</p>
      <p className="text-xl mb-4">{new Date(album.releaseDate).toLocaleDateString()}</p>
      
      <h2 className="text-2xl font-bold mb-4">Songs</h2>
      
      <div className="bg-black text-white rounded-lg p-4">
        <div className="flex justify-between border-b border-gray-700 pb-2 mb-2">
          <span>#</span>
          <span className="flex-1 text-left pl-8">Title</span>
        </div>
        {album.songs.map((song, index) => (
          <div
            key={song._id}
            className="flex justify-between items-center py-2 hover:bg-gray-800 rounded cursor-pointer"
            onClick={() => setSong(song.songFileUrl, song.title, album.artist.name)}
          >
            <span className="w-8">{index + 1}</span>
            <div className="flex-1 text-left pl-8">
              <p className="text-white">{song.title}</p>
              <p className="text-gray-400 text-sm">{album.artist.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumPage;
