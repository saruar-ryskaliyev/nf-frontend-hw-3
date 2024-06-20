import { cookies } from 'next/headers';
import { Artist } from '../../types'; // Import the Artist type
import axiosInstance from '../../axiosInstance';
import ArtistPage from '../../components/ArtistPage';
import nookies from 'nookies';

interface PageProps {
  params: { id: string };
}

const fetchArtist = async (id: string, token: string): Promise<Artist | null> => {
  try {
    const response = await axiosInstance.get<Artist>(`/artists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.error('Error fetching artist:', error);
    return null;
  }
};

const ArtistSlugPage = async ({ params }: PageProps) => {
  const cookiesList = cookies();
  const token = cookiesList.get('accessToken')?.value || '';


  const artist = await fetchArtist(params.id, token);

  if (!artist) {
    return <div>No artist found</div>;
  }

  return <ArtistPage artist={artist} />;
};

export default ArtistSlugPage;
