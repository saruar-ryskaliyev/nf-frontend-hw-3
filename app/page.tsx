'use client';

import axios from 'axios';
import axiosInstance from './axiosInstance';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';
import Tile from './components/Tile';
import {Album, Artist, Playlist} from './types/index';


const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [artists, setArtists] = useState<Artist[]>([]); // Use Artist[] type
  const [albums, setAlbums] = useState<Album[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const [artistsRes, albumsRes, playlistsRes] = await Promise.all([
            axiosInstance.get<Artist[]>('/artists'), 
            axiosInstance.get<Album[]>('/albums'),
            axiosInstance.get<Playlist[]>('/playlists')
          ]);


          setArtists(artistsRes.data);
          setAlbums(albumsRes.data);
          setPlaylists(playlistsRes.data);

        } catch (error) {
          setError('Failed to fetch data');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">

        <h2 className="text-2xl font-bold mb-4">My Playlists</h2>
        <div className="flex overflow-x-scroll mb-8">
          {playlists.map((playlist: any) => (
            <div className="flex-none w-64 mr-4">
              <Tile
                imageUrl='https://via.placeholder.com/300'
                key={playlist._id}
                title={playlist.name}
              />
            </div>
          ))}
        </div>


        <h2 className="text-2xl font-bold mb-4">Artists</h2>
        <div className="flex overflow-x-scroll mb-8">
          {artists.map((artist: any) => (
            <div className="flex-none w-64 mr-4">
              <Tile
                key={artist._id}
                imageUrl={artist.photoUrl}
                title={artist.name}
                linkUrl={`/artists/${artist._id}`}
              />
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Albums</h2>
        <div className="flex overflow-x-scroll mb-8">
          {albums.map((album: any) => (
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
    </ProtectedRoute>
  );
};

export default HomePage;
