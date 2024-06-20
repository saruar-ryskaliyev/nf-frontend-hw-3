'use client'

import React from 'react';
import { Artist } from '../types';
import { useMusicPlayer } from '../context/MusicPlayerContext';
import Tile from './Tile';
import Image from 'next/image';

export interface ArtistPageProps {
    artist: Artist;
}

const ArtistPage: React.FC<ArtistPageProps> = ({ artist }) => {

    const { setSong } = useMusicPlayer();


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
                <Image src={artist.photoUrl} alt={artist.name} className="w-32 h-32 object-cover rounded-full mr-4" />
                <div>
                    <h1 className="text-4xl font-bold">{artist.name}</h1>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Songs</h2>
            <div className="bg-gray-900 text-white rounded-lg p-4">
                {artist.songs.map((song, index) => (
                    <div key={song._id} className="flex justify-between items-center py-2 hover:bg-gray-800 rounded" onClick={() => setSong(song.songFileUrl, song.title, artist.name)}>
                        <div className="flex items-center">
                            <span className="w-8 text-center">{index + 1}</span>
                            <div className="flex-1 pl-4">
                                <p className="text-white">{song.title}</p>
                                <p className="text-gray-400 text-sm">{artist.name}</p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-bold mb-4">Albums</h2>
            <div className="flex overflow-x-scroll mb-8">
                {artist.albums.map((album: any) => (
                    <div className="flex-none w-64 mr-4">
                        <Tile
                            key={album._id}
                            imageUrl={album.albumCoverUrl}
                            title={album.title}
                            linkUrl={`/albums/${album._id}`}
                        />
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ArtistPage;
