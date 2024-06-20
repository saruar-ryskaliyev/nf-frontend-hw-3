import { cookies } from 'next/headers';
import { Playlist } from '../../types'; // Import the Playlist type
import axiosInstance from '../../axiosInstance';
import PlaylistPage from '../../components/PlaylistPage';
import nookies from 'nookies';

interface PageProps {
  params: { id: string };
}

const fetchPlaylist = async (id: string, token: string): Promise<Playlist | null> => {
  try {
    const response = await axiosInstance.get<Playlist>(`/playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching playlist:', error);
    return null;
  }
};

const PlaylistSlugPage = async ({ params }: PageProps) => {
  const cookiesList = cookies();
  const token = cookiesList.get('accessToken')?.value || '';

  const playlist = await fetchPlaylist(params.id, token);

  if (!playlist) {
    return <div>No playlist found</div>;
  }

  return <PlaylistPage playlist={playlist} />;
};

export default PlaylistSlugPage;
