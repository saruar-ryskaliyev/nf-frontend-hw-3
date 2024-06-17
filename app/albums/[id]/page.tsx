
import { GetServerSideProps } from 'next';
import { Album } from '../../types'; // Import the Album type
import axiosInstance from '../../axiosInstance';
import AlbumPage, { AlbumPageProps } from '../../components/AlbumPage';

interface PageProps {
  params: { id: string };
}

const fetchAlbum = async (id: string): Promise<Album | null> => {
  try {
    const response = await axiosInstance.get<Album>(`/albums/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

const AlbumSlugPage = async ({ params }: PageProps) => {
  const album = await fetchAlbum(params.id);

  if (!album) {
    return <div>No album found</div>;
  }

  return <AlbumPage album={album} />;
};

export default AlbumSlugPage;
