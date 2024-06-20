import { cookies } from 'next/headers';
import { Album } from '../../types'; // Import the Album type
import axiosInstance from '../../axiosInstance';
import AlbumPage from '../../components/AlbumPage';

interface PageProps {
  params: { id: string };
}

const fetchAlbum = async (id: string, token: string): Promise<Album | null> => {
  try {
    const response = await axiosInstance.get<Album>(`/albums/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching album:', error);
    return null;
  }
};

const AlbumSlugPage = async ({ params }: PageProps) => {
  const cookiesList = cookies();
  const token = cookiesList.get('accessToken')?.value || '';

  const album = await fetchAlbum(params.id, token);

  if (!album) {
    return <div>No album found</div>;
  }

  return <AlbumPage album={album} />;
};

export default AlbumSlugPage;
