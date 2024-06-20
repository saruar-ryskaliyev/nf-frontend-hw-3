'use client';

import React from 'react';
import { Song } from '../types';
import { useMusicPlayer } from '../context/MusicPlayerContext';

interface SongsListPageProps {
  songs: Song[];
}

const SongsListPage: React.FC<SongsListPageProps> = ({ songs }) => {
  const { setSong } = useMusicPlayer();

  if (!songs || songs.length === 0) {
    return <div>No songs found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Songs</h2>
      <div className="bg-black text-white rounded-lg p-4">
        <div className="flex justify-between border-b border-gray-700 pb-2 mb-2">
          <span>#</span>
          <span className="flex-1 text-left pl-8">Title</span>
        </div>
        {songs.map((song, index) => (
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

export default SongsListPage;
