'use client';

import axios from 'axios';
import axiosInstance from './axiosInstance';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';
import Tile from './components/Tile';
import RoundTile from './components/RoundTile';
import { Album, Artist, Playlist } from './types/index';
import Sidebar from './components/Sidebar';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [artists, setArtists] = useState<Artist[]>([]); // Use Artist[] type
  const [albums, setAlbums] = useState<Album[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);

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
      <div className="flex">
        {showSidebar && <Sidebar />}
        <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
        <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>
          <h2 className="text-2xl font-bold mb-4">My Playlists</h2>
          <div className="flex overflow-x-scroll mb-8">
            {playlists.map((playlist) => (
              <div key={playlist._id} className="flex-none w-64 mr-4">
                <Tile
                  imageUrl="https://via.placeholder.com/300"
                  title={playlist.name}
                  linkUrl={`/playlists/${playlist._id}`}
                />
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4">Artists</h2>
          <div className="flex overflow-x-scroll mb-8">
            {artists.map((artist) => (
              <div key={artist._id} className="flex-none w-64 mr-4">
                <RoundTile
                  imageUrl={artist.photoUrl}
                  title={artist.name}
                  linkUrl={`/artists/${artist._id}`}
                />
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4">Albums</h2>
          <div className="flex overflow-x-scroll mb-8">
            {albums.map((album) => (
              <div key={album._id} className="flex-none w-64 mr-4">
                <Tile
                  imageUrl={album.albumCoverUrl}
                  title={album.title}
                  linkUrl={`/albums/${album._id}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};
export default HomePage;
