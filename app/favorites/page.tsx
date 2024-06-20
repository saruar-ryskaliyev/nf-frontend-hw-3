import { cookies } from 'next/headers';
import { Song } from '../types';
import axiosInstance from '../axiosInstance';
import FavoritesPage from '../components/FavoritesPage';

interface PageProps {
  params: { id: string };
}

const fetchFavorites = async (token: string): Promise<Song[] | null> => {
  try {
    const response = await axiosInstance.get<Song[]>('/users/favorites', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return null;
  }
};

const FavoritesPageContainer = async ({ params }: PageProps) => {
  const cookiesList = cookies();
  const token = cookiesList.get('accessToken')?.value || '';

  const songs = await fetchFavorites(token);

  if (!songs || songs.length === 0) {
    return <div>No favorites found</div>;
  }

  return <FavoritesPage favorites={songs} />;
};

export default FavoritesPageContainer;
