import axiosInstance from '../../axiosInstance';
import { Album, Artist, Song } from '../../types/index';
import Tile from '../../components/Tile';
import ProtectedRoute from '../../components/ProtectedRoute';
import SongsListPage from '../../components/SongsListPage';
import { cookies } from 'next/headers';

interface SearchResults {
  songs: Song[];
  albums: Album[];
  artists: Artist[];
}

interface PageProps {
  params: { query: string };
}

const fetchSearchResults = async (token: string, query: string): Promise<SearchResults | null> => {
  try {
    const response = await axiosInstance.get<SearchResults>('/users/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return null;
  }
};

const SearchPage = async ({ params }: PageProps) => {
  const { query } = params;
  const token = cookies().get('accessToken')?.value || '';
  const searchResults = await fetchSearchResults(token, query);

  if (!searchResults) {
    return <div>No results found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {searchResults.songs.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Songs</h2>
          <SongsListPage songs={searchResults.songs} />
        </>
      )}

      {searchResults.artists.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Artists</h2>
          <div className="flex overflow-x-scroll mb-8">
            {searchResults.artists.map((artist) => (
              <div key={artist._id} className="flex-none w-64 mr-4">
                <Tile
                  imageUrl={artist.photoUrl}
                  title={artist.name}
                  linkUrl={`/artists/${artist._id}`}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {searchResults.albums.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Albums</h2>
          <div className="flex overflow-x-scroll mb-8">
            {searchResults.albums.map((album) => (
              <div key={album._id} className="flex-none w-64 mr-4">
                <Tile
                  imageUrl={album.albumCoverUrl}
                  title={album.title}
                  linkUrl={`/albums/${album._id}`}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
